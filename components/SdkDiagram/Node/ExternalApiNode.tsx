import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Position } from 'reactflow'
import { NodeInfoCard } from '../NodeInfoCard'
import { SourceHandle } from './SourceHandle'
import { TargetHandle } from './TargetHandle'
import { getSourceHandleId, getTargetHandleId } from './helpers'

export type ExternalApiNodeData = {
  label: string
  link: { url: string; title: string }
}
export const EXTERNAL_API_NODE = 'externalApiNode'
export function ExternalApiNode({ data }: { data: ExternalApiNodeData }) {
  return (
    <>
      <div className={classNames('border-current, flex-col rounded-md border bg-white text-zinc-200')}>
        <div className="p-4">
          <div className={classNames('text-lg text-zinc-600')}>{data.label}</div>
          <div className="flex items-center text-sm text-primary hover:text-primary-dark">
            {data.label} <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className={classNames('relative flex flex-col items-center py-5 pl-4')}>
            <NodeInfoCard titleClass="text-zinc-400" title="webhook" value="users/{userId}/watch" />
            <div className={classNames('full absolute bottom-2 mt-[1px] h-[5px] w-[5px] rounded bg-current')}></div>
          </div>
          <div className={classNames('relative flex flex-col items-center justify-center py-5 pr-4')}>
            <div className="absolute -right-[1px] h-[18px] w-[10px] rounded-bl-full rounded-tl-full border border-current">
              <div className="absolute -right-1 h-full w-full rounded-full bg-white"></div>
            </div>
            <NodeInfoCard titleClass="text-zinc-400" title="POST" value="users/{userId}/messages/send" />
          </div>
        </div>
      </div>
      <div className={classNames('text-zinc-300')}>
        <svg style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }} className="text-zinc-300">
          <defs>
            <marker id="external" refX={4} refY={1} markerHeight={16} markerWidth={16}>
              <ellipse cx="4" cy="4" rx="3" ry="3" fill="white" stroke="currentColor" />
            </marker>
          </defs>
        </svg>

        <SourceHandle position={Position.Bottom} id={getSourceHandleId(0)} left={126} />
        <TargetHandle position={Position.Right} id={getTargetHandleId(1)} top={133} />
      </div>
    </>
  )
}
