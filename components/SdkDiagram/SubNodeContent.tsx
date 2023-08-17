import classNames from 'classnames'
import { HtmlHTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { DocumentationCard } from './DocumentationCard'
import { usePopoverState } from '@utils/popoverState'

type Props = { title?: string; value?: string; titleClass?: string } & HtmlHTMLAttributes<HTMLDivElement>

export const SubNodeContent = forwardRef<HTMLDivElement, Props>(({ title, value, titleClass, ...otherProps }, ref) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { ref: popoverRef, isVisible: isDocumentationCardVisible, toggle } = usePopoverState<HTMLDivElement>()
  const { styles, attributes } = usePopper(referenceElement, popoverRef.current, {
    placement: 'auto',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [8, 8],
        },
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
    ],
  })

  return (
    <>
      <DocumentationCard
        {...attributes.popper}
        style={{
          ...styles.popper,
          visibility: isDocumentationCardVisible ? 'visible' : 'hidden',
          opacity: isDocumentationCardVisible ? 1 : 0,
          zIndex: 100,
        }}
        ref={popoverRef}
      ></DocumentationCard>
      <div {...attributes.arrow} ref={setArrowElement} style={styles.arrow}></div>
      <div
        ref={setReferenceElement}
        {...otherProps}
        onClick={toggle}
        className="group flex w-full flex-col overflow-hidden rounded-md border border-zinc-200/75 bg-zinc-50/50 font-code hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      >
        <div
          className={classNames(
            'flex items-center  border-b border-zinc-200/75 px-3 py-1 text-sm dark:border-zinc-800 dark:group-hover:border-zinc-600',
            titleClass
          )}
        >
          {title}
        </div>
        <div className="flex items-center px-3 py-1 text-zinc-500">{value}</div>
      </div>
    </>
  )
})
