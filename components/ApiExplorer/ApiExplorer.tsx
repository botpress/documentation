import { BoltIcon } from '@heroicons/react/24/outline'
import * as monacoEditor from 'monaco-editor'
import { useRef, useState } from 'react'
import { CodeExecuter } from './code-executer'
import { CodeEditor, EditorWithExtensions, Extension, copyCode } from './monaco'
import { actionButton } from './monaco/action-button'
import { formatDocument } from './monaco/helpers'
import { SAMPLE_MESSAGES } from './prompts/prompts.constants'
import { DEFAULT_THEME } from './theme'
import {
  executePromptChain,
  getResponseFromPrompt,
  getResponseFromPrompt2,
  getResponseFromPrompt3,
} from './ApiExplorer.http'

export function ApiExplorer() {
  const codeExecuterRef = useRef<CodeExecuter>()
  const [query, setQuery] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false)
  const outputEditorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null)
  const inputEditorExtensions: Extension[] = [
    copyCode,
    (editor, domNode) => actionButton(editor, domNode, { title: 'Run', onClick: run }),
  ]

  async function run(editor: CodeEditor) {
    if (!codeExecuterRef.current) {
      codeExecuterRef.current = new CodeExecuter()
    }
    const output = await codeExecuterRef.current.executeCode(editor.getValue())
    setOutput(output)
    setTimeout(() => {
      formatDocument(outputEditorRef.current!)
    }, 500)
  }

  function onMountInputEditor(_editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) {
    // monaco is the global scope of all the editors instances on the page
    // this changes the settings of all the editors on the page
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true })
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({ schemaValidation: 'ignore', validate: false })
    monaco.editor.defineTheme(DEFAULT_THEME.name, DEFAULT_THEME.theme)
    monaco.editor.setTheme(DEFAULT_THEME.name)
  }

  function generate() {
    setAwaitingResponse(true)
    executePromptChain(query, [getResponseFromPrompt, getResponseFromPrompt2, getResponseFromPrompt3])
      .then((response) => {
        setResponse(response?.[0] ?? '')
      })
      .finally(() => {
        setAwaitingResponse(false)
      })
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="queryField" className="mb-2 block text-sm text-zinc-400">
        What do you want to do with the API?
      </label>
      <textarea
        id="queryField"
        rows={3}
        className="mb-2 rounded-lg border border-zinc-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
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
                className="mr-2 flex cursor-pointer items-center whitespace-nowrap rounded-full border border-zinc-100 px-4 text-sm first:ml-5 last:mr-5 hover:border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {message}
              </div>
            )
          })}
        </div>
        <button disabled={awaitingResponse} onClick={generate} className="button primary icon-leading">
          {awaitingResponse ? (
            'Generating...'
          ) : (
            <>
              <BoltIcon />
              Generate
            </>
          )}
        </button>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="block rounded-t-lg bg-zinc-700 px-4 py-2 text-sm text-zinc-400">generated.ts</div>
        <EditorWithExtensions
          className="monaco-editor-container rounded-none"
          height={'35vh'}
          options={{ fontSize: 15, padding: { top: 16 }, minimap: { enabled: false } }}
          defaultLanguage="typescript"
          onMount={onMountInputEditor}
          extensions={inputEditorExtensions}
          value={['console.log(client)', 'console.log(arguments)', response.toString()].join('\n')}
        />
        <div className="mt-[-1px] block bg-zinc-700 px-4  py-2 text-sm text-zinc-400">Output</div>
        <EditorWithExtensions
          className="monaco-editor-container rounded-t-none"
          height={'20vh'}
          extensions={[copyCode]}
          options={{ fontSize: 12, padding: { top: 16 }, minimap: { enabled: false } }}
          defaultLanguage="json"
          onMount={(editor) => (outputEditorRef.current = editor)}
          value={[output].join('\n')}
        />
      </div>
    </div>
  )
}
