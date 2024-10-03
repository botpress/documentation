import { z } from 'zod'

type AdditionalProperties = JSONSchemaProperty | boolean

type CommonProps = {
  description?: string
  deprecated?: boolean
}

type StringObject = CommonProps & {
  type: 'string'
  maxLength?: number
  enum?: string[]
}

type PrimitiveObject = CommonProps & {
  type: 'number' | 'null' | 'boolean'
}

type ArrayObject = CommonProps & {
  type: 'array'
  items: PrimitiveObject | ArrayObject | ObjectObject | StringObject
}

type ObjectObject = CommonProps & {
  type: 'object'
  properties: Record<string, PrimitiveObject | StringObject | ArrayObject | ObjectObject>
  additionalProperties?: AdditionalProperties
  required: string[]
}
export type JSONSchemaProperty = PrimitiveObject | StringObject | ArrayObject | ObjectObject

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

export const ParameterSchema = z
  .object({
    name: z.string(),
    in: z.enum(['path', 'query']),
    description: z.string(),
    required: z.boolean().optional(),
    schema: z.union([
      z.object({ type: z.literal('string') }),
      z.object({ type: z.literal('boolean') }),
      z.object({ type: z.literal('integer') }),
      z.object({ type: z.literal('object'), additionalProperties: z.object({ type: z.literal('string') }).optional() }),
      z.object({
        type: z.literal('array'),
        items: z.object({ type: z.literal('string') }).optional(),
      }),
      z.object({}),
    ]),
  })
  .strict()

export type Parameter = z.infer<typeof ParameterSchema>

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const
type HttpMethod = (typeof httpMethods)[number]

export function isHttpMethod(value: any): value is HttpMethod {
  return httpMethods.includes(value)
}

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined
}
