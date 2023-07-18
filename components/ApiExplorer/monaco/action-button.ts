import { Extension } from './extensions'

export const actionButton = (
  editor: Parameters<Extension>['0'],
  domNode: Parameters<Extension>['1'],
  buttonConfig: {
    title: string
    onClick: () => void
  }
) => {
  if (domNode) {
    const actionButton = document.createElement('button')
    actionButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg> ${buttonConfig.title || 'Click'}`
    actionButton.className = 'icon-leading button primary absolute bottom-[12px] right-[20px]'

    actionButton.addEventListener('click', buttonConfig.onClick)
    domNode.appendChild(actionButton)
  }
}
