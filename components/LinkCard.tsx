import { Card } from '@components/Card'
import { DocumentationIcon, DocumentationIcons } from '@components/DocumentationIcon'
import cx from 'classnames'
import Link, { LinkProps } from 'next/link'
import React from 'react'

type LinkCardProps = {
  title: string
  className?: string
  href: LinkProps['href']
  icon?: DocumentationIcons
  children?: React.ReactNode
}

export function LinkCard({ title, className, href, icon, children }: LinkCardProps) {
  return (
    <Link
      href={href}
      className={cx(
        'rounded-md border-2 border-transparent transition-all hover:border-bpBlue hover:shadow-lg',
        className
      )}
    >
      <Card className="h-full p-4">
        <div className='p-4 bg-blue-50 rounded flex justify-center items-center'>
          {icon && <DocumentationIcon name={icon} className="max-h-14 max-w-18 text-bpBlue" />}
        </div>
        <div className="pt-3 text-xl font-bold">{title}</div>
        <div className="pt-2.5 text-base"> {children}</div>
      </Card>
    </Link>
  )
}
