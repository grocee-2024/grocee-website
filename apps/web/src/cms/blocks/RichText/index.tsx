'use client'

import { useEffect, useState } from 'react'
import { RichTextBlock } from 'cms-types'

import { richTextToJSX } from '@/helpers'

export function RichText({ content }: RichTextBlock) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <div className='width-limit'>{richTextToJSX(content)}</div>
}
