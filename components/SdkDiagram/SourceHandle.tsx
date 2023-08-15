import { Handle, HandleProps, Position } from 'reactflow'

export function SourceHandle(props: { top?: number; left?: number; id: string } & Partial<HandleProps>) {
  return (
    <Handle
      position={Position.Right}
      {...props}
      type="source"
      style={{ top: props.top, left: props.left, backgroundColor: 'white' }}
      className="rounded-full border-0 bg-white opacity-0"
    />
  )
}
