import { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import * as monacoEditor from 'monaco-editor'

export type CodeEditor = monacoEditor.editor.ICodeEditor
export type Extension = (editor: monacoEditor.editor.ICodeEditor, domNode: HTMLDivElement | null) => void

/**
 *
 * @param extensions An 2d array of extensions corresponding to each editor on the page
 * @returns
 */
export function withExtensions(
  extensions?: Array<Array<(editor: monacoEditor.editor.ICodeEditor, domNode: HTMLDivElement | null) => void>>
) {
  const monaco = useMonaco()
  useEffect(() => {
    if (monaco) {
      monaco.editor.getEditors().forEach((editor, index) => {
        const domNode = editor.getDomNode() as HTMLDivElement
        extensions?.[index]?.forEach((extension) => extension(editor, domNode))
      })
    }
  }, [monaco])
  return monaco
}
