import { Editor, EditorProps } from '@monaco-editor/react'
import * as monacoEditor from 'monaco-editor'

export type CodeEditor = monacoEditor.editor.ICodeEditor
export type Extension = (
  editor: monacoEditor.editor.ICodeEditor,
  /**
   * The dom node of the editor `.monaco-editor`
   */
  domNode: HTMLDivElement | null
) => void

/**
 * @returns a monkey patched version of the monaco editor with support for extensions
 */
export function EditorWithExtensions(props: EditorProps & { extensions?: Extension[] }) {
  function handleOnMount(editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) {
    props.extensions?.forEach((extension) => extension(editor, editor.getDomNode() as HTMLDivElement))
    props?.onMount?.(editor, monaco)
  }

  return <Editor {...props} onMount={handleOnMount} />
}
