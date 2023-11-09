import { Extension } from './extensions'
export const copyCode: Extension = (editor, domNode) => {
  if (domNode) {
    const copyButton = document.createElement('button')
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                          </svg>`
    copyButton.className =
      'flex justify-center items-center button absolute h-[48px] w-[48px] top-[8px] right-[20px] opacity-50 text-zinc-50 bg-zinc-700 hover:bg-zinc-900 hover:text-zinc-50  focus:text-zinc-50 focus:bg-zinc-900 px-0 p-2 rounded-full'

    copyButton.addEventListener('click', () => {
      const value = editor.getValue()
      navigator.clipboard.writeText(value)
    })
    domNode.appendChild(copyButton)
  }
}
