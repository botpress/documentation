import { Edge, Node } from 'reactflow'
import { v4 as uuid } from 'uuid'

export class NodeCreator<T extends {}, SubNodes extends SubNode<SubNodeTitle>, SubNodeTitle extends string> {
  node: Node<T>
  subNodeBuilder: SubNodeBuilder<SubNodes, SubNodeTitle> | undefined

  constructor(nodeWithoutId: Omit<Node<T>, 'id'>, subNodes?: SubNodeBuilder<SubNodes, SubNodeTitle>) {
    this.node = { ...nodeWithoutId, id: uuid() }
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
    targetSubNodeTitle: TargetNodeCreator['subNodes'][number]['title']
  ): Edge {
    const targetSubNode = targetNodeCreator.subNodes.find((subNode) => subNode.title === targetSubNodeTitle)
    const sourceSubNode = this.subNodes.find((subNode) => subNode.title === sourceSubNodeTitle)
    if (!targetSubNode) throw new Error(`No target subnode found with title ${targetSubNodeTitle}`)
    if (!sourceSubNode) throw new Error(`No source subnode found with title ${sourceSubNodeTitle}`)
    return {
      id: `${this.node.id}-${targetNodeCreator.node.id}`,
      source: this.node.id,
      target: targetNodeCreator.node.id,
      targetHandle: targetSubNode?.sourceHandle,
      sourceHandle: sourceSubNode?.targetHandle,
      type: 'smoothstep',
      markerStart: 'external',
      animated: false,
    }
  }
}

export function getHandleBuilder<T extends string>(defaultHandle: T) {
  return new HandleBuilder(defaultHandle)
}

class HandleBuilder<T extends string> {
  handles: T[] = []
  constructor(_initialHandle: T) {
    if (this.handles.some((handle) => handle === _initialHandle))
      throw new Error(`Handle already exists: ${_initialHandle}`)
    this.handles.push(_initialHandle)
  }

  appendHandle<U extends string>(s: U) {
    return new HandleBuilder<T | U>(s)
  }
}

type SubNode<Title extends string> = {
  title: Title
  targetHandle?: string
  sourceHandle?: string
}

export class SubNodeBuilder<T extends SubNode<Title>, Title extends string> {
  subNodes: T[] = []
  constructor(_initialSubNode: T, _parent?: SubNodeBuilder<T, Title>) {
    this.subNodes = [...(_parent?.subNodes ?? []), _initialSubNode]
  }

  appendSubNode<U extends SubNode<NewTitle>, NewTitle extends string>(s: U) {
    return new SubNodeBuilder<T | U, Title | NewTitle>(s, this)
  }
}
