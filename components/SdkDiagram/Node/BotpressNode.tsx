import classNames from 'classnames'
import { HtmlHTMLAttributes, SVGProps, useContext, MouseEvent } from 'react'
import { NodeProps } from 'reactflow'
import { NodeInfoCard } from '../NodeInfoCard'
import { EdgesContext } from '../SdkDiagram'
import { SourceHandle } from './SourceHandle'
import { TargetHandle } from './TargetHandle'
import { getSourceHandleId, getTargetHandleId } from './helpers'
export const BOTPRESS_NODE = 'botpress'
export type BotpressNodeData = {
  label: string
  icon?: () => JSX.Element
  defaultCurrentColorClass?: string
  infoCardTitleClass?: string
  labelColorClass?: string
  headerBgClass?: string
  sourceMarkerId: string
  subNodes?: { title?: string; value?: string; hasTarget?: boolean; hasSource?: boolean }[]
}

export function BotpressNode({ data, ...otherProps }: NodeProps<BotpressNodeData>) {
  const edges = useContext(EdgesContext)
  function onSubNodeClick(event: MouseEvent<HTMLDivElement>, index: number) {
    event.stopPropagation()
    edges?.setEdges((prevEdges) => {
      prevEdges.forEach((edge) => {
        if (edge.source === otherProps.id && edge.sourceHandle === getSourceHandleId(index)) {
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
      <div className={classNames('flex-col rounded-md border border-current', data.defaultCurrentColorClass)}>
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
          {data.subNodes?.map((subNode, index) => (
            <div key={index} className={classNames('relative flex items-center justify-center px-4 py-1')}>
              {subNode.hasTarget && (
                <>
                  <TargetHandle id={getTargetHandleId(index)} />
                  <TargetHandleGroove />
                </>
              )}
              <NodeInfoCard
                onClick={(e) => onSubNodeClick(e, index)}
                titleClass={data.infoCardTitleClass}
                title={subNode.title}
                value={subNode.value}
              />
              {subNode.hasSource && (
                <>
                  <SourceHandle id={getSourceHandleId(index)} />
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
          <ellipse cx="4" cy="4" rx="3" ry="3" fill="white" stroke="currentColor" />
        </marker>
      </defs>
    </svg>
  )
}

function TargetHandleGroove() {
  return (
    <div className="absolute -left-[1px] h-[18px] w-[10px] rounded-br-full rounded-tr-full border border-current">
      <div className="absolute -left-1 h-full w-full rounded-full bg-white"></div>
    </div>
  )
}

function SourceHandleMock(props: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames('full absolute right-[5px] mt-[1px] h-[5px] w-[5px] rounded bg-current', props.className)}
    ></div>
  )
}
