import { Edge, Node } from 'reactflow'
import { v4 as uuid } from 'uuid'

export class NodeCreator<T extends {}, TargetHandles extends string, SourceHandles extends string> {
  node: Node<T>
  targetHandleBuilder: HandleBuilder<TargetHandles> | undefined
  sourceHandleBuilder: HandleBuilder<SourceHandles> | undefined
  constructor(
    nodeWithoutId: Omit<Node<T>, 'id'>,
    targetHandles?: HandleBuilder<TargetHandles>,
    sourceHandles?: HandleBuilder<SourceHandles>
  ) {
    this.targetHandleBuilder = targetHandles
    this.sourceHandleBuilder = sourceHandles
    this.node = { ...nodeWithoutId, id: uuid() }
  }
  get id() {
    return this.node.id
  }
  get data() {
    return this.node.data
  }

  get targetHandles() {
    if (!this.targetHandleBuilder) throw new Error('No target handle builder')
    return this.targetHandleBuilder.handles
  }

  get sourceHandles() {
    if (!this.sourceHandleBuilder) throw new Error('No source handle builder')
    return this.sourceHandleBuilder.handles
  }

  connectWithNode<TargetNode extends {}, TargetHandles extends string, SourceHandles extends string>(
    targetNodeCreator: NodeCreator<TargetNode, TargetHandles, SourceHandles>,
    sourceHandle: (typeof this.sourceHandles)[number],
    targetHandle: TargetHandles
  ): Edge {
    return {
      id: 'e1-2',
      source: this.node.id,
      target: targetNodeCreator.node.id,
      targetHandle: targetHandle,
      sourceHandle: sourceHandle,
      type: 'smoothstep',
      markerStart: 'external',
      animated: true,
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
