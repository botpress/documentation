import classNames from 'classnames'
import { useState } from 'react'

type CollapsibleProps = {
  /**
   * the first one is always used as the heading and, if more than one children are provided, the rest as contentChild
   */
  children?: React.ReactNode | React.ReactNode[]
  defaultCollapsed?: boolean
  isCollapsible?: boolean
  className?: string
}

export function Collapsible({ isCollapsible = false, ...props }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(props.defaultCollapsed ?? true)
  const heading = Array.isArray(props.children) ? props.children[0] : props.children
  const contentChild = Array.isArray(props.children) ? props.children.slice(1) : false

  return (
    <div className={classNames('rounded-lg border border-zinc-200 dark:border-zinc-700', props.className)}>
      <div
        onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
        className={classNames(
          'group flex items-center justify-between border-zinc-200 p-2 group-hover:bg-indigo-100 dark:border-zinc-700',
          { 'border-hidden': isCollapsed, 'cursor-pointer': isCollapsible, 'border-b': Boolean(contentChild) }
        )}
      >
        <div className="[&>*]:m-0">{heading}</div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={classNames(
            { hidden: !isCollapsible },
            isCollapsed
              ? 'rotate-0 border-transparent'
              : 'rotate-90 border-bpBlue/10 bg-bpBlue/5 dark:border-white/20 dark:bg-bpBlue/10',
            'h-[26px] min-w-[26px] origin-center rounded-xl border p-[2px] transition-transform duration-200 group-hover:border-bpBlue/20 group-hover:bg-indigo-200/25 dark:group-hover:border-white/50 dark:group-hover:bg-bpBlue/25'
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
            className={classNames(
              'group-hover:text-bpBlue dark:group-hover:text-white',
              isCollapsed ? 'text-zinc-400' : 'text-bpBlue/60 dark:text-white/50'
            )}
          ></path>
        </svg>
      </div>
      {contentChild && <div className={classNames({ hidden: isCollapsed }, 'p-2')}>{contentChild}</div>}
    </div>
  )
}
