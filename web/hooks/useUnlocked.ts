import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export type Unlocked = {
  user: string
  data: {
    street: string
    postalCode: string
    phone: string
    phoneUrl: string
    references: {
      company: string
      name: string
      role: string
      phone: string
      phoneUrl: string
      email: string
      logo: { src: string; height: number; width: number }
    }[]
  }
}

export default function useUnlocked() {
  const t = useTranslations('UnlockButton')
  const [unlocked, setUnlocked] = useState<Unlocked>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const unlock = useCallback(async (password: string) => {
    setLoading(true)
    try {
      setError(null)
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json()
      if (mounted.current) {
        if (res.ok) {
          setUnlocked(json)
          localStorage.setItem('unlock', password)
          return json.user
        } else {
          if (json.error === 'Password is incorrect') {
            localStorage.removeItem('unlock')
          }
          throw new Error(json.error)
        }
      }
    } catch (err) {
      if (mounted.current) {
        setError(err.message)
      }
      throw err
    } finally {
      if (mounted.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('unlock') && !loading && !unlocked && !error) {
      toast.promise(
        unlock(localStorage.getItem('unlock') as string),
        {
          loading: t('unlocking'),
          success: (name) => t('welcomeBack', { name }),
          error: (err) => err.message,
        },
        {
          success: {
            icon: '👋',
          },
        }
      )

      return () => {
        toast.dismiss()
      }
    }
  }, [error, loading, t, unlock, unlocked])

  return { unlocked, loading, error, setError, unlock }
}

export type UnlockProps = ReturnType<typeof useUnlocked>
