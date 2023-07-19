import { BoltIcon } from '@heroicons/react/24/outline'
import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { getResponseFromPromptChain } from './ApiExplorer.http'
import { executeCode } from './code-executer'
import { CodeEditor, copyCode, withExtensions } from './monaco'
import { actionButton } from './monaco/action-button'
import { SAMPLE_MESSAGES } from './prompts/prompts.constants'
import { DEFAULT_THEME } from './theme'

export function ApiExplorer() {
  const [query, setQuery] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const monaco = withExtensions([
    copyCode,
    (editor, domNode) => actionButton(editor, domNode, { title: 'Run', onClick: run }),
  ])

  function run(editor: CodeEditor) {
    executeCode(editor.getValue())
  }

  function generate() {
    getResponseFromPromptChain(query).then((response) => {
      console.log(response)
      setResponse(response)
    })
  }

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true })
      monaco.editor.defineTheme('default', DEFAULT_THEME)
      monaco.editor.setTheme('default')
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
        <div className="block rounded-t-lg bg-zinc-700 px-4 py-2 text-sm text-zinc-400">generated.ts</div>
        <Editor
          className="monaco-editor-container rounded-t-none"
          height={'35vh'}
          options={{ fontSize: 15, padding: { top: 16 }, minimap: { enabled: false } }}
          defaultLanguage="typescript"
          value={["const fart='fart!!!';", 'console.log(fart)', response.toString()].join('\n')}
        ></Editor>
      </div>
    </div>
  )
}
