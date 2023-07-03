import React from 'react'
import Blog from '@assets/blog.inline.svg'
import Book from '@assets/book.inline.svg'
import Chat from '@assets/chat.inline.svg'
import Chip from '@assets/chip.inline.svg'
import Coding from '@assets/coding.inline.svg'
import Grid from '@assets/grid.inline.svg'
import Keyboard from '@assets/keyboard.inline.svg'
import Rocket from '@assets/learning_center.inline.svg'
import Lightning from '@assets/lightning.inline.svg'
import Prompt from '@assets/prompt.inline.svg'
import StudioLayout from '@assets/studio-layout.inline.svg'

type ImageProps = React.ComponentProps<'img'>
type SvgProps = React.ComponentProps<'svg'>

export type DocumentationIcons =
  | 'book'
  | 'chip'
  | 'coding'
  | 'keyboard'
  | 'prompt'
  | 'blog'
  | 'studio_layout'
  | 'chat'
  | 'grid'
  | 'lightning'
  | 'rocket'

const IconElement = (name: DocumentationIcons) => {
  switch (name) {
    case 'book':
      return (props: ImageProps) => <img {...props} alt="Book" src={Book} />
    case 'chip':
      return (props: ImageProps) => <img {...props} alt="Chip" src={Chip} />
    case 'coding':
      return (props: ImageProps) => <img {...props} alt="Coding" src={Coding} />
    case 'keyboard':
      return (props: ImageProps) => <img {...props} alt="Keyboard" src={Keyboard} />
    case 'prompt':
      return (props: ImageProps) => <img {...props} alt="Prompt" src={Prompt} />
    case 'blog':
      return (props: ImageProps) => <img {...props} alt="Blog" src={Blog} />
    case 'studio_layout':
      return (props: ImageProps) => <img {...props} alt="StudioLayout" src={StudioLayout} />
    case 'chat':
      return (props: ImageProps) => <img {...props} alt="Chat" src={Chat} />
    case 'grid':
      return (props: ImageProps) => <img {...props} alt="Grid" src={Grid} />
    case 'lightning':
      return (props: ImageProps) => <img {...props} alt="Lightning" src={Lightning} />
    case 'rocket':
      return (props: ImageProps) => <img {...props} alt="Rocket" src={Rocket} />
    default:
      return (props: SvgProps) => <svg {...props} />
  }
}

export function DocumentationIcon(props: { name: DocumentationIcons; className: string }) {
  const Icon = IconElement(props.name)
  return <Icon className={props.className} />
}
