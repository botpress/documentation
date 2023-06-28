type AdditionalProperties = JSONSchemaProperty | boolean
type StringObject = {
  type: 'string'
  maxLength?: number
}
type PrimitiveObject = {
  type: 'number' | 'null' | 'boolean'
  description?: string
}

type ArrayObject = {
  type: 'array'
  description?: string
  items: PrimitiveObject | ArrayObject | ObjectObject | StringObject
}

type ObjectObject = {
  type: 'object'
  description?: string
  properties: Record<string, PrimitiveObject | ArrayObject | ObjectObject>
  additionalProperties?: AdditionalProperties
  required: string[]
}
export type JSONSchemaProperty = PrimitiveObject | ArrayObject | ObjectObject

export type JSONSchemaType = {
  $schema?: string
  title?: string
  type: 'object'
  properties: Record<string, JSONSchemaProperty>
  additionalProperties?: AdditionalProperties
  required: string[]
}

export type JSONSchemaProps = JSX.IntrinsicElements['div'] & {
  jsonSchema: JSONSchemaType | ObjectObject
  statusCode?: string
  description?: string
  collapsable?: boolean
  parent?: string
}

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const
type HttpMethod = typeof httpMethods[number]

export function isHttpMethod(value: any): value is HttpMethod {
  return httpMethods.includes(value)
}

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined
}
