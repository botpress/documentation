import classNames from 'classnames'
import React, { Fragment } from 'react'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Endpoint = {
  method: Method
  path: string
}

type EndpointBLockProps = {
  endpoints: Endpoint[]
  title?: string
  className?: string
}

export function EndpointBlock(props: EndpointBLockProps) {
  return (
    <div
      className={classNames(
        'overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900',
        props.className
      )}
    >
      {props.title && (
        <div className="border-b border-zinc-300 bg-zinc-100 p-2 px-4 text-base font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {props.title}
        </div>
      )}
      <div className="grid grid-cols-[auto_1fr] p-2 px-4">
        {props.endpoints.map((endpoint) => {
          const { method, path } = endpoint

          return (
            <Fragment key={`${method} ${path}`}>
              <pre
                data-theme
                className={classNames('mr-2 text-end font-bold', {
                  'text-blue-500 dark:text-blue-400': method === 'GET',
                  'text-red-600 dark:text-red-500': method === 'DELETE',
                  'text-purple-500 dark:text-purple-400': method === 'PATCH',
                  'text-emerald-600 dark:text-emerald-600': method === 'POST',
                  'text-fuchsia-500 dark:text-fuchsia-500': method === 'PUT',
                })}
              >
                {method}
              </pre>
              <pre data-theme className="text-zinc-500 dark:text-zinc-400">
                {path}
              </pre>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
