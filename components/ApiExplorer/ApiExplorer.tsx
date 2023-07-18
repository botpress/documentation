import { BoltIcon } from '@heroicons/react/24/outline'
import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { getResponseFromPromptChain } from './ApiExplorer.http'
import { SAMPLE_MESSAGES } from './prompts/prompts.constants'

export function ApiExplorer() {
  const [query, setQuery] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const monaco = useMonaco()

  function generate() {
    getResponseFromPromptChain(query).then((response) => {
      console.log(response)
      setResponse(response)
    })
  }

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true })
    }
  }, [monaco])

  return (
    <div className="flex flex-col">
      <label htmlFor="queryField" className="mb-2 block text-sm text-zinc-400">
        What do you want to do with the API?
      </label>
      <textarea
        id="queryField"
        rows={4}
        className="mb-2 rounded-lg border border-zinc-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Describe what you want to do in natural language"
      ></textarea>
      <div className="flex items-stretch">
        <div className="no-scrollbar relative mr-3 flex overflow-x-scroll">
          {SAMPLE_MESSAGES.map((message) => {
            return (
              <div
                onClick={(event) => {
                  ;(event.target as HTMLDivElement).scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'nearest',
                  })
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
        <button onClick={generate} className="button primary icon-leading">
          <BoltIcon />
          Generate
        </button>
      </div>

      <div className="mt-10 flex flex-col">
        <label htmlFor="responseField" className="mb-2 block text-sm text-zinc-400">
          Generated Code
        </label>
        <Editor
          className="monaco-editor-container"
          height={'35vh'}
          theme="vs-dark"
          defaultLanguage="typescript"
          value={["import Client from '@botpress/client';", response.toString()].join('\n')}
        ></Editor>
      </div>
    </div>
  )
}
