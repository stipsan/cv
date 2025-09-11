import createImageUrlBuilder from '@sanity/image-url'
import { Card } from '@sanity/ui'
import SocialMediaCard from 'components/SocialMediaCard'
import { useCallback, useMemo } from 'react'
import { useDataset, useProjectId } from 'sanity'

export default function SocialMediaCardPreview(props: any) {
  const projectId = useProjectId()
  const dataset = useDataset()
  // @TODO find a better way
  let headshot = {
    src: 'https://source.unsplash.com/256x256/?face',
    width: 256,
    height: 256,
  }
  const imageBuilder = useMemo(
    () => createImageUrlBuilder({ projectId, dataset }),
    [dataset, projectId]
  )
  const urlForImage = useCallback(
    (source: Parameters<typeof imageBuilder.image>[0]) =>
      imageBuilder.image(source).auto('format').fit('max'),
    [imageBuilder]
  )

  if (props.document?.displayed?.social?.headshot?.asset?._ref) {
    // https://cdn.sanity.io/images/sh40okwp/production/6cd14d5ec37736d21ab36ff30c3c490b27f2666c-322x322.png
    //const [, id, dimensions, format] =
    //  props.document?.displayed?.social?.headshot?.asset?._ref.split('-')
    // const src = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
    headshot.src = urlForImage(
      props.document?.displayed?.social?.headshot?.asset
    )
      .height(256)
      .width(256)
      .fit('crop')
      .url()
  }

  return (
    <Card
      padding={4}
      sizing="border"
      style={{ minHeight: '100%' }}
      tone="transparent"
      overflow="hidden"
    >
      <SocialMediaCard
        // className='w-[500px]'
        className="w-[1280px] -translate-x-[30%] -translate-y-1/4 scale-[0.4]"
        eyebrow={props.document?.displayed?.social?.eyebrow || 'social.eyebrow'}
        name={props.document?.displayed?.social?.name || 'social.name'}
        pronouns={
          props.document?.displayed?.social?.pronouns || 'social.pronouns'
        }
        role={props.document?.displayed?.social?.role || 'social.role'}
        headshot={headshot}
      />
    </Card>
  )
}
