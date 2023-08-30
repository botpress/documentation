import classNames from 'classnames'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useRef, useState } from 'react'
type ImageProps = {
  /**
   * defaults to `natural`
   */
  width?: number | 'full' | 'natural'
}

export function Image({ width = 'natural', ...props }: Omit<NextImageProps, 'width' | 'height'> & ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const figureRef = useRef<HTMLElement | null>(null)

  function getWidth() {
    if (width === 'full') return '100%'
    if (width === 'natural') {
      const naturalWidth = img?.naturalWidth ?? 0
      const figureWidth = figureRef.current?.getBoundingClientRect().width ?? 0
      if (naturalWidth > figureWidth) {
        return '100%'
      }
      return img?.naturalWidth
    }
    return width
  }

  return (
    <figure ref={figureRef} className="my-3 flex w-full flex-col items-center">
      <div className={classNames('relative h-[400px] w-full overflow-hidden rounded-sm')} style={{ width: getWidth() }}>
        <NextImage
          onLoadingComplete={(img) => {
            setIsLoaded(true)
            setImg(img)
          }}
          {...props}
          fill
          style={{ objectFit: 'contain', opacity: isLoaded ? 1 : 0 }}
        />

        {!isLoaded && 'Loading...'}
      </div>
      <figcaption className="text-center text-zinc-700 dark:text-zinc-400">{props.alt}</figcaption>
    </figure>
  )
}
