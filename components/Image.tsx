import NextImage, { ImageProps } from 'next/image'

export function Image(props: Omit<ImageProps, 'width' | 'height'>) {
  return (
    <figure className="my-2 flex w-full flex-col items-center">
      <div className="relative h-[400px] w-full overflow-hidden rounded-sm">
        <NextImage {...props} fill style={{ objectFit: 'contain' }} />
      </div>
      <figcaption className="text-center text-zinc-700 dark:text-zinc-400">{props.alt}</figcaption>
    </figure>
  )
}
