import { useState } from 'react'

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
      <div className="flex justify-end">
        <button className="button primary">Generate</button>
      </div>
    </div>
  )
}
