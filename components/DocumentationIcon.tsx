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
import Desktop from '@assets/desktop.icon.svg'
import ReactIcon from '@assets/react.svg'
import Javascript from '@assets/javascript.svg'
import Code from '@assets/code.icon.svg'
import Community from '@assets/community.icon.svg'
import Dashboard from '@assets/dashboard.icon.svg'

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
  | 'desktop'
  | 'react'
  | 'code'
  | 'javascript'
  | 'community'
  | 'dashboard'

export function DocumentationIcon(props: { name: DocumentationIcons; className: string }) {
  const IconElement = (() => {
    switch (props.name) {
      case 'book':
        return Book
      case 'chip':
        return Chip
      case 'coding':
        return Coding
      case 'keyboard':
        return Keyboard
      case 'prompt':
        return Prompt
      case 'blog':
        return Blog
      case 'studio_layout':
        return StudioLayout
      case 'chat':
        return Chat
      case 'grid':
        return Grid
      case 'lightning':
        return Lightning
      case 'rocket':
        return Rocket
      case 'desktop':
        return Desktop
      case 'react':
        return ReactIcon
      case 'code':
        return Code
      case 'javascript':
        return Javascript
      case 'community':
        return Community
      case 'dashboard':
        return Dashboard

      default:
        return <svg />
    }
  })()
  return <IconElement className={props.className} />
}
