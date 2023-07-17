import { useState } from 'react'
import { SAMPLE_MESSAGES } from './prompts/prompts.constants'

export function ApiExplorer() {
  const [query, setQuery] = useState<string>('')

  return (
    <div className="flex flex-col">
      <label htmlFor="queryField" className="mb-2 block text-sm text-zinc-600">
        Query (prompt)
      </label>
      <textarea
        id="queryField"
        rows={4}
        className="mb-2 rounded-lg border border-zinc-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Describe what you want to do in natural language"
      ></textarea>
      <div className="flex">
        <div className="no-scrollbar mr-2 flex overflow-x-scroll">
          {SAMPLE_MESSAGES.map((message) => {
            return (
              <div
                onClick={(event) => {
                  setQuery(message)
                }}
                key={message}
                className="mr-2 flex cursor-pointer items-center whitespace-nowrap rounded-full border border-zinc-100 px-4 text-sm first:ml-5 last:mr-5 hover:border-zinc-200 hover:bg-zinc-100"
              >
                {message}
              </div>
            )
          })}
        </div>
        <button className="button primary">Generate</button>
      </div>
    </div>
  )
}
