import classNames from 'classnames'
import { HtmlHTMLAttributes, MouseEvent, SVGProps, useContext } from 'react'
import { EdgesContext } from '../SdkDiagram'
import { SubNodeContent } from '../SubNodeContent'
import { NodeProps } from './Node'
import { SourceHandle } from './SourceHandle'
import { TargetHandle } from './TargetHandle'
import { getSourceHandleId } from './helpers'
export const BOTPRESS_NODE = 'botpress'
export type BotpressNodeData = {
  label: string
  icon?: () => JSX.Element
  defaultCurrentColorClass?: string
  infoCardTitleClass?: string
  labelColorClass?: string
  headerBgClass?: string
  sourceMarkerId: string
}

export function BotpressNode({ data, ...otherProps }: NodeProps<BotpressNodeData>) {
  const edges = useContext(EdgesContext)
  const subNodes = data.nodeCreatorInstance.subNodes

  function onSubNodeClick(event: MouseEvent<HTMLDivElement>, index: number) {
    event.stopPropagation()
    edges?.setEdges((prevEdges) => {
      prevEdges.forEach((edge) => {
        if (edge.source === otherProps.id && edge.sourceHandle === subNodes[index].sourceHandle) {
          edge.animated = true
        } else {
          edge.animated = false
        }
      })

      return [...prevEdges]
    })
  }

  return (
    <>
      <SourceMarker id={data.sourceMarkerId} className={data.defaultCurrentColorClass} />
      <div
        className={classNames(
          'relative flex-col rounded-md border border-current bg-white dark:bg-dark',
          data.defaultCurrentColorClass
        )}
      >
        <div className={classNames('flex rounded-t-md border-b border-current', data.headerBgClass)}>
          <div
            className={classNames(
              'flex h-[32px] w-[42px] items-center justify-center rounded-tl-md border-r border-current'
            )}
          >
            {data.icon && <data.icon />}
          </div>
          <div className={classNames('flex grow items-center px-3 text-sm', data.labelColorClass)}>{data.label}</div>
        </div>
        <div className="flex flex-col py-2">
          {subNodes?.map((subNode, index) => (
            <div key={index} className={classNames('relative flex items-center justify-center px-4 py-1')}>
              {subNode.targetHandle && (
                <>
                  <TargetHandle id={subNode.targetHandle} />
                  <TargetHandleGroove />
                </>
              )}
              <SubNodeContent
                onClick={(e) => onSubNodeClick(e, index)}
                titleClass={data.infoCardTitleClass ?? ''}
                title={subNode.title}
                value={subNode.value}
                details={subNode.details}
              />
              {subNode.sourceHandle && (
                <>
                  <SourceHandle id={subNode.sourceHandle} />
                  <SourceHandleMock />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function SourceMarker(props: { id: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}
      id={`${props.id}-marker-container`}
    >
      <defs>
        <marker id={props.id} refX={1} refY={4} markerHeight={16} markerWidth={16}>
          <ellipse
            cx="4"
            cy="4"
            rx="3"
            ry="3"
            className="fill-white stroke-current dark:fill-dark dark:stroke-zinc-500"
          />
        </marker>
      </defs>
    </svg>
  )
}

function TargetHandleGroove() {
  return (
    <div className="absolute -left-[1px] h-[18px] w-[10px] rounded-br-full rounded-tr-full border border-current"></div>
  )
}

function SourceHandleMock(props: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames('full absolute right-[5px] mt-[1px] h-[5px] w-[5px] rounded bg-current', props.className)}
    ></div>
  )
}
