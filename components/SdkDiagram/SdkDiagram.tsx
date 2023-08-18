import { Dispatch, SetStateAction, createContext, useCallback } from 'react'
import ReactFlow, { Edge, NodeMouseHandler, addEdge, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/base.css'
import { BOTPRESS_NODE, BotpressNode, EXTERNAL_API_NODE, ExternalApiNode } from './Node'
import { EdgeData, SMOOTH_STEP_WITH_LABEL_EDGE, SmoothStepWithLabelEdge } from './SmoothStepLabelEdge'
import { botNode, gmailNode } from './constants'

const edgeTypes = { [SMOOTH_STEP_WITH_LABEL_EDGE]: SmoothStepWithLabelEdge }
const nodeTypes = { [BOTPRESS_NODE]: BotpressNode, [EXTERNAL_API_NODE]: ExternalApiNode }
export const EdgesContext = createContext<{
  edges: Edge[]
  setEdges: Dispatch<SetStateAction<Edge<EdgeData>[]>>
} | null>(null)

export function SdkDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState([gmailNode.node, botNode.node] as any)
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    gmailNode.connectWithNode(botNode, 'd1', 'p1'),
    botNode.connectWithNode(gmailNode, 'd2', 'p2'),
  ])

  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick: NodeMouseHandler = (event, node) => {
    // Animate edges
    setEdges((prevEdges) => {
      prevEdges.forEach((edge) => {
        if (edge.source === node.id) {
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
      <div className="relative h-[80vh] w-full bg-dot-grid-light bg-[length:20px_20px] p-4 dark:bg-dot-grid-dark">
        <EdgesContext.Provider value={{ edges, setEdges }}>
          <ReactFlow
            className="m-3"
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </EdgesContext.Provider>
      </div>
    </>
  )
}
