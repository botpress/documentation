import { Edge, Node, NodeProps as ReactFlowNodeProps } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { DocumentationCardProps } from '../DocumentationCard'
import { EdgeData, SMOOTH_STEP_WITH_LABEL_EDGE } from '../SmoothStepLabelEdge'

type WithNodeCreatorInstance<T extends {}> = T & {
  nodeCreatorInstance: NodeCreator<T, SubNode<string>, any>
}
export type NodeProps<T extends {}> = ReactFlowNodeProps<WithNodeCreatorInstance<T>>

/**
 * Provides typesafe way to creating and interacting with nodes
 */
export class NodeCreator<T extends {}, SubNodes extends SubNode<SubNodeTitle>, SubNodeTitle extends string> {
  node: Node<WithNodeCreatorInstance<T>>
  subNodeBuilder: SubNodeBuilder<SubNodes, SubNodeTitle> | undefined

  constructor(nodeWithoutId: Omit<Node<T>, 'id'>, subNodes?: SubNodeBuilder<SubNodes, SubNodeTitle>) {
    this.node = { ...nodeWithoutId, id: uuid(), data: { ...nodeWithoutId.data, nodeCreatorInstance: this } }
    this.subNodeBuilder = subNodes
  }
  get id() {
    return this.node.id
  }

  get data() {
    return this.node.data
  }

  get subNodes() {
    if (!this.subNodeBuilder) throw new Error('No target handle builder')
    return this.subNodeBuilder.subNodes
  }

  connectWithSubNode<
    TargetNodeCreator extends NodeCreator<{}, SubNodes, SubNodeTitle>,
    SubNodes extends SubNode<SubNodeTitle>,
    SubNodeTitle extends string
  >(
    targetNodeCreator: TargetNodeCreator,
    sourceSubNodeTitle: (typeof this.subNodes)[number]['title'],
    targetSubNodeTitle: TargetNodeCreator['subNodes'][number]['title'],
    edgeData?: EdgeData
  ): Edge {
    const targetSubNode = targetNodeCreator.subNodes.find((subNode) => subNode.title === targetSubNodeTitle)
    const sourceSubNode = this.subNodes.find((subNode) => subNode.title === sourceSubNodeTitle)
    if (!targetSubNode) throw new Error(`No target subnode found with title ${targetSubNodeTitle}`)
    if (!sourceSubNode) throw new Error(`No source subnode found with title ${sourceSubNodeTitle}`)
    if (!targetSubNode.targetHandle) throw new Error(`No target handle found for target subnode ${targetSubNodeTitle}`)
    if (!sourceSubNode.sourceHandle) throw new Error(`No source handle found for source subnode ${sourceSubNodeTitle}`)

    return {
      id: `${this.node.id}-${targetNodeCreator.node.id}`,
      source: this.node.id,
      target: targetNodeCreator.node.id,
      targetHandle: targetSubNode.targetHandle,
      sourceHandle: sourceSubNode.sourceHandle,
      type: SMOOTH_STEP_WITH_LABEL_EDGE,
      markerStart: sourceSubNode?.markerId ?? 'external',
      data: edgeData,
    }
  }
}

export function getSubNodeBuilder<T extends SubNode<Title>, Title extends string>(_initialSubNode: T) {
  return new SubNodeBuilder(_initialSubNode)
}

export type SubNode<Title extends string> = {
  title: Title
  targetHandle?: string
  sourceHandle?: string
  value?: string
  details?: DocumentationCardProps
  markerId?: string
}

class SubNodeBuilder<T extends SubNode<Title>, Title extends string> {
  subNodes: T[] = []
  constructor(_initialSubNode: T, _parent?: SubNodeBuilder<T, Title>) {
    this.subNodes = [...(_parent?.subNodes ?? []), _initialSubNode]
  }

  appendSubNode<U extends SubNode<NewTitle>, NewTitle extends string>(s: U) {
    return new SubNodeBuilder<T | U, Title | NewTitle>(s, this)
  }
}
