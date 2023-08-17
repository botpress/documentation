import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { HTMLAttributes, forwardRef } from 'react'
type Props = {} & HTMLAttributes<HTMLDivElement>
export const DocumentationCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
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
        Handler
      </div>
      <div className="p-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          The handler function is used to handle the incoming requests from the integration. Which means that this
          function will be called every time the telegram integration sends a request to the webhook url set in the
          register function.
        </p>
        <p>
          In this case, when the Gmail API has a new email it calls the webhook url we’ve registered with it. The
          request is parsed by the handler which in turn calls the onNewEmail function defined in the integration
          implementation.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="button primary icon-trailing w-full">
            Code <ArrowTopRightOnSquareIcon />
          </button>
          <button className="button secondary icon-trailing w-full">
            Documentation <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
})
