import { usePopoverState } from '@utils/popoverState'
import classNames from 'classnames'
import { HtmlHTMLAttributes, forwardRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { DocumentationCard, DocumentationCardProps } from './DocumentationCard'

export type SubNodeContentProps = {
  title?: string
  value?: string
  titleClass?: string
  details?: DocumentationCardProps
}
export const SubNodeContent = forwardRef<HTMLDivElement, SubNodeContentProps & HtmlHTMLAttributes<HTMLDivElement>>(
  ({ title, value, titleClass, ...otherProps }, ref) => {
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
            offset: [4, 4],
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
            transition: 'opacity 0.3s',
          }}
          {...otherProps.details}
          ref={popoverRef}
        ></DocumentationCard>
        <div {...attributes.arrow} ref={setArrowElement} style={styles.arrow}></div>
        <div
          ref={setReferenceElement}
          {...otherProps}
          onClick={(e) => {
            otherProps?.onClick?.(e)
            toggle()
          }}
          className={classNames(
            'group flex w-full flex-col overflow-hidden rounded-md border border-zinc-200/75 bg-zinc-50/50 font-code hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800',
            {
              'border-zinc-300 bg-white/100 dark:border-zinc-600 dark:bg-zinc-800/100': isDocumentationCardVisible,
            }
          )}
        >
          <div
            className={classNames(
              'flex items-center  border-b border-zinc-200/75 px-3 py-1 text-sm group-hover:border-zinc-300 dark:border-zinc-800 dark:group-hover:border-zinc-600',
              titleClass,
              {
                'border-zinc-300/100 dark:border-zinc-600 ': isDocumentationCardVisible,
              }
            )}
          >
            {title}
          </div>
          <div className="flex items-center px-3 py-1 text-zinc-500">{value}</div>
        </div>
      </>
    )
  }
)