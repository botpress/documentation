import classNames from 'classnames'
import { HtmlHTMLAttributes } from 'react'

export function NodeInfoCard(
  props: { title?: string; value?: string; titleClass?: string } & HtmlHTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className=" flex w-full flex-col overflow-hidden rounded-md border border-zinc-200/75 bg-zinc-50/50 font-code hover:border-zinc-300 hover:bg-white"
    >
      <div className={classNames('flex items-center  border-b border-zinc-200/75 px-3 py-1 text-sm', props.titleClass)}>
        {props.title}
      </div>
      <div className="flex items-center px-3 py-1 text-zinc-500">{props.value}</div>
    </div>
  )
}
