import * as monacoEditor from 'monaco-editor'

export function formatDocument(editor: monacoEditor.editor.IStandaloneCodeEditor) {
  editor
    .getAction?.('editor.action.formatDocument')
    ?.run()
    .then(() => {
      editor.setScrollTop(0)
    })
}
