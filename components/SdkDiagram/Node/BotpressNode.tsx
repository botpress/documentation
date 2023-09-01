import classNames from 'classnames'
import { HtmlHTMLAttributes, MouseEvent, SVGProps, useContext } from 'react'
import { Position } from 'reactflow'
import { EdgesContext } from '../SdkDiagram'
import { SubNodeContent } from '../SubNodeContent'
import { NodeProps, SubNodeBuilder } from './Node'
import { SourceHandle } from './SourceHandle'
import { TargetHandle } from './TargetHandle'
export const BOTPRESS_NODE = 'botpress'
export type BotpressNodeData = {
  label: string
  icon?: () => JSX.Element
  defaultCurrentColorClass?: string
  infoCardTitleClass?: string
  labelColorClass?: string
  headerBgClass?: string
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
          {subNodes?.map((subNode, index) => {
            return (
              <div key={index} className={classNames('relative flex items-center justify-center px-4 py-1')}>
                <SourceMarker
                  inverted={subNode.inverted}
                  id={SubNodeBuilder.getMarkerId(subNode)}
                  className={data.defaultCurrentColorClass}
                />
                {subNode.targetHandle && (
                  <>
                    <TargetHandle
                      position={subNode.inverted ? Position.Right : Position.Left}
                      id={subNode.targetHandle}
                    />
                    <TargetHandleGroove inverted={subNode.inverted} />
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
                    <SourceHandle
                      position={subNode.inverted ? Position.Left : Position.Right}
                      id={subNode.sourceHandle}
                    />
                    <SourceHandleMock inverted={subNode.inverted} />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function SourceMarker(props: { id: string; inverted?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} id={`${props.id}Container`} style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}>
      <defs>
        <marker id={props.id} refX={props.inverted ? 8 : 1} refY={4} markerHeight={16} markerWidth={16}>
          <ellipse
            cx="4"
            cy="4"
            rx="3"
            ry="3"
            className="fill-white stroke-zinc-200 dark:fill-dark dark:stroke-zinc-500"
          />
        </marker>
      </defs>
    </svg>
  )
}

type TargetHandleGrooveProps = {
  inverted?: boolean
}
function TargetHandleGroove(props: TargetHandleGrooveProps) {
  return (
    <div
      className={classNames(
        'absolute h-[18px] w-[10px] border border-current',
        props.inverted ? '-right-[1px] rounded-bl-full rounded-tl-full' : '-left-[1px] rounded-br-full rounded-tr-full'
      )}
    ></div>
  )
}
type SourceHandleMockProps = {
  inverted?: boolean
}
function SourceHandleMock(props: SourceHandleMockProps & HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'full absolute h-[5px] w-[5px] rounded bg-current',
        props.className,
        props.inverted ? 'left-[5px]' : 'right-[5px] mt-[1px]'
      )}
    ></div>
  )
}
