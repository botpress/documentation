import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { HTMLAttributes } from 'react'
type Props = {}
export function DocumentationCard(props: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames(
        'rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900',
        props.className
      )}
    >
      <div className="border-b border-zinc-200 p-3 px-4 text-zinc-500 dark:border-zinc-800">Handler</div>
      <div className="m-w-[280px] p-3 px-4 text-sm text-zinc-600">
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
          <button className="button primary icon-trailing">
            Code <ArrowTopRightOnSquareIcon />
          </button>
          <button className="button secondary icon-trailing">
            Documentation <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
