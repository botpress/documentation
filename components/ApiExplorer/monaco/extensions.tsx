import { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import * as monacoEditor from 'monaco-editor'

export type Extension = (editor: monacoEditor.editor.ICodeEditor, domNode: HTMLDivElement | null) => void

export function withExtensions(
  extensions?: Array<(editor: monacoEditor.editor.ICodeEditor, domNode: HTMLDivElement | null) => void>
) {
  const monaco = useMonaco()
  useEffect(() => {
    if (monaco) {
      monaco.editor.getEditors().forEach((editor) => {
        const domNode = editor.getDomNode() as HTMLDivElement
        extensions?.forEach((extension) => extension(editor, domNode))
      })
    }
  }, [monaco])
  return monaco
}
