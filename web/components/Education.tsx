import { useTranslations } from 'next-intl'
import { memo } from 'react'

// *[_type == 'education']{_id,school,degree,field,start,end}

const activityItems = [
  {
    id: 1,
    school: 'Vestvågøy videregående skole, Leknes',
    study: 'VG2, Elektrofag',
    when: '2008 - 2009',
  },
  {
    id: 2,
    school: 'Vestvågøy videregående skole, Leknes',
    study: 'VG1, Elektrofag',
    when: '2006 - 2007',
  },
  {
    id: 3,
    school: 'Svolvær Videregående Skole',
    study: 'Studieforberedende',
    when: '2005 - 2006',
  },
]

export default memo(function Education() {
  const t = useTranslations('Education')
  return (
    <section className="my-5 break-inside-avoid rounded-2xl border border-slate-300 border-opacity-25 bg-slate-50 px-6 py-4">
      <h1 className="text-lg font-medium leading-6 text-slate-900">
        {t('title')}
      </h1>
      <ul role="list" className="divide-y divide-slate-200">
        {activityItems.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex-row items-center justify-between">
                  <h3 className="font-medium">{activityItem.school}</h3>
                  <p className="text-sm text-slate-500">{activityItem.study}</p>
                  <p className="text-sm">{activityItem.when}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
})
