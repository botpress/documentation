import cx from 'classnames'
import React from 'react'

export type CardProps = JSX.IntrinsicElements['div']

export function Card(props: CardProps) {
 return <div {...props} className={cx('rounded-md border border-zinc-100 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800', props.className)} />
}

