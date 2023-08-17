import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { HTMLAttributes, forwardRef } from 'react'
export type DocumentationCardProps = {
  title?: string
  bodyMarkDown?: string
  actionLinks?: {
    label: string
    link: string
    isExternal?: boolean
  }[]
}
export const DocumentationCard = forwardRef<HTMLDivElement, DocumentationCardProps & HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'max-w-[310px] rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900',
          props.className
        )}
      >
        <div className="border-b border-zinc-200 p-3 px-4 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300">
          {props.title}
        </div>
        <div className="p-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
          {props.bodyMarkDown}
          <div className="mt-4 flex gap-2">
            {props.actionLinks?.map((actionLink, index) => (
              <Link
                key={index}
                href={actionLink.link}
                target={actionLink.isExternal ? '_blank' : '_self'}
                className={classNames('button icon-trailing w-full', actionLink.isExternal ? 'primary' : 'secondary')}
              >
                {actionLink.label} {actionLink.isExternal ? <ArrowTopRightOnSquareIcon /> : <ArrowRightIcon />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
