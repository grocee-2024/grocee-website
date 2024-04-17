'use client'

import clsx from 'clsx'
import { Image as PayloadImageType } from 'cms-types'
import { useInView } from 'framer-motion'
import { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { useWindowSize } from '../../hooks'

export type PayloadImageProps = {
  /**
   * The image to display
   */
  src?: PayloadImageType
  /**
   * Optional alt property for the image
   * Is normally extracted from the payload image object, but can be overridden
   */
  alt?: string
  /**
   * Optional props for the nested img element
   */
  imgProps?: Omit<JSX.IntrinsicElements['img'], 'width' | 'height' | 'placeholder'>
  /**
   * Optional object-fit property for the nested img element
   */
  objectFit?: CSSProperties['objectFit']
  /**
   * Because most of the time, we don't know the exact dimensions of the image on the page,
   * so we preload the smallest possible size and blur it, until the page becomes interactive.
   *
   * This prop disables the blur effect of this component, which means that the low resolution image
   * will be shown on the page natively, until the full resolution one is loaded.
   * This is probably best combined with `sizes`, so that the component knows which sizes to preload.
   */
  skipBlur?: boolean
  /**
   * Because most of the time, we don't know the exact dimensions of the image on the page,
   * so we preload the smallest possible size and blur it, until the page becomes interactive.
   *
   * This prop disables the fast loading, which means that until the page becomes interactive,
   * no image will be shown at all.
   */
  skipFastLoad?: boolean
  /**
   * Optional sizes property for the HTML picture element. If not provided, the component will try to
   * determine the best size based on the available sizes and the current window size.
   *
   * More info: [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
   *
   * Providing a sizes prop, will result in faster loads and better SEO, so do so whenever you can.
   */
  sizes?: string
} & JSX.IntrinsicElements['picture']

const getNextBiggest = (sizes: number[], width: number) =>
  sizes.reduce((acc, size) => (size > width && size < acc ? size : acc), Math.max(...sizes))

export function PayloadImage({
  src,
  alt,
  imgProps,
  objectFit,
  skipBlur,
  skipFastLoad,
  sizes,
  className,
  ...pictureProps
}: PayloadImageProps) {
  const { windowSize } = useWindowSize()
  const pictureRef = useRef<HTMLPictureElement>(null)
  const [pictureWidth, setPictureWidth] = useState<number | null>(null)

  const isInView = useInView(pictureRef)

  const { avif, webp, png, biggestPng, smallestPng, availableSizes } = useMemo(() => {
    return Object.values(src?.sizes ?? {}).reduce(
      (acc, { mimeType, url, width }) => {
        if (url == null || width == null) return acc

        if (mimeType === 'image/webp') {
          acc.webp = (acc.webp === '' ? '' : acc.webp + ',') + `${url} ${width}w`
        }

        if (mimeType === 'image/avif') {
          acc.avif = (acc.avif === '' ? '' : acc.avif + ',') + `${url} ${width}w`
        }

        if (mimeType === 'image/png') {
          acc.png = (acc.png === '' ? '' : acc.png + ',') + `${url} ${width}w`
          acc.availableSizes.push(width)
          if (acc.biggestPng.width < width) acc.biggestPng = { url, width }
          if (acc.smallestPng.width > width) acc.smallestPng = { url, width }
        }

        return acc
      },
      {
        avif: '',
        webp: '',
        png: '',
        biggestPng: {
          url: '',
          width: 0,
        },
        smallestPng: {
          url: '',
          width: Infinity,
        },
        availableSizes: [] as number[],
      },
    )
  }, [src])

  useLayoutEffect(() => {
    if (pictureRef.current == null) return

    const width = pictureRef.current.getBoundingClientRect().width
    const nearestSize = getNextBiggest(availableSizes, width)

    if (nearestSize > (pictureWidth ?? 0)) {
      setPictureWidth(nearestSize)
    }
  }, [pictureRef, windowSize, src])

  const customSizes = useMemo(() => {
    if (sizes) return sizes

    if (pictureWidth) return skipFastLoad ? null : `${smallestPng.width}px`

    return `${pictureWidth}px`
  }, [sizes, pictureWidth, skipFastLoad, smallestPng.width])

  return (
    <picture
      ref={pictureRef}
      {...pictureProps}
      className={clsx(
        {
          blur: pictureWidth == null && !skipBlur,
          'w-full': !pictureWidth,
        },
        'relative transition-[filter]',
        className,
      )}
    >
      {customSizes && (
        <>
          {avif && <source srcSet={avif} type='image/avif' sizes={customSizes} />}
          {webp && <source srcSet={webp} type='image/webp' sizes={customSizes} />}
          {png && <source srcSet={png} type='image/png' sizes={customSizes} />}

          {pictureWidth && (
            <img
              {...imgProps}
              src={biggestPng.url}
              alt={alt ?? src?.alt ?? ''}
              loading={isInView ? 'eager' : 'lazy'}
              style={{
                ...{ objectFit },
                ...imgProps?.style,
              }}
            />
          )}
        </>
      )}
    </picture>
  )
}
