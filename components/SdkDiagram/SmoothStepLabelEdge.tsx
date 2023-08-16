import classNames from 'classnames'
import { useMemo } from 'react'
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from 'reactflow'
export type EdgeData = { color: string; hasLabel?: boolean }

export const SMOOTH_STEP_WITH_LABEL_EDGE = 'smoothStepWithLabelEdge'

export function SmoothStepWithLabelEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
  data,
  ...otherProps
}: EdgeProps<EdgeData>) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const labelOrientation = useMemo(() => computeLabelOrientation(), [sourceX, sourceY, targetX, targetY])
  function computeLabelOrientation(): 'left' | 'right' | 'top' | 'bottom' {
    const horizontal = sourceX < targetX ? 'right' : 'left'
    const vertical = sourceY < targetY ? 'bottom' : 'top'

    const verticalMagnitude = Math.abs(sourceY - targetY)
    const horizontalMagnitude = Math.abs(sourceX - targetX)
    return verticalMagnitude > horizontalMagnitude ? vertical : horizontal
  }
  const defaultColor = 'hsl(0deg 0% 70% / 33%)'
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{
          stroke: defaultColor,
          opacity: otherProps.animated ? 1 : 0.8,
          ...style,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            color: data?.color ?? defaultColor,
          }}
          className="nodrag nopan"
        >
          {data?.hasLabel !== false && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              className={classNames('transition-opacity duration-1000', {
                'opacity-0': otherProps.animated,
                'rotate-180': labelOrientation === 'left',
                '-rotate-90': labelOrientation === 'top',
                'rotate-90': labelOrientation === 'bottom',
              })}
            >
              <rect width="16" height="18" transform="matrix(1 0 0 -1 0 18)" className="fill-white dark:fill-dark" />
              <path
                opacity="0.3"
                d="M0 2.50024L4.49997 8.5002L-5.24533e-07 14.5002L3.74997 14.5002L8.24994 8.5002L3.74997 2.50024L0 2.50024Z"
                fill="currentColor"
              />
              <path
                className={classNames('animate-pulse')}
                d="M5.25 2.50024L9.74997 8.5002L5.25 14.5002L8.99997 14.5002L13.4999 8.5002L8.99997 2.50024L5.25 2.50024Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
