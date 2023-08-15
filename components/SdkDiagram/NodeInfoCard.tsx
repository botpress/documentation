import classNames from 'classnames'

export function NodeInfoCard(props: { title?: string; value?: string; titleClass?: string }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border border-zinc-200/75 bg-zinc-50/50 font-code">
      <div className={classNames('flex items-center border-b  border-zinc-200/75 px-3 py-1 text-sm', props.titleClass)}>
        {props.title}
      </div>
      <div className="flex items-center px-3 py-1 text-zinc-500">{props.value}</div>
    </div>
  )
}
