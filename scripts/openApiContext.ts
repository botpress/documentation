import OpenAPIParser from '@readme/openapi-parser'
import { flatten, groupBy } from 'lodash'
import { z } from 'zod'
import metadataJson from '../public/static/openApi/metadata.json'
import openApiJson from '../public/static/openApi/openapi.json'
import { JSONSchemaType, isDefined, isHttpMethod } from './generateApiDocumentationPage.types'

const Schema = z.object({
  paths: z.record(z.any()),
  components: z.object({
    schemas: z.record(z.any()).transform((schemas) => {
      return schemas as Record<string, JSONSchemaType>
    }),
    responses: z.record(z.any()),
    parameters: z.record(z.any()),
    requestBodies: z.record(z.any()),
  }),
})

const SectionSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  schema: z.string().optional(),
  operations: z.array(z.string()),
})

const ErrorSchema = z.object({
  type: z.string(),
  description: z.string(),
  status: z.number(),
})

const Metadata = z.object({
  sections: z.array(SectionSchema),
  errors: z.array(ErrorSchema),
})

const Parameter = z.object({
  name: z.string(),
  in: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  allowEmptyValue: z.boolean().optional(),
  schema: z.object({ type: z.string() }).optional(),
})

const RequestBody = z
  .object({
    description: z.string().optional(),
    content: z.object({
      'application/json': z.object({
        schema: z.unknown({}),
      }),
    }),
    required: z.boolean().optional().default(false),
  })
  .transform((body) => {
    return {
      description: body.description,
      schema: body.content['application/json'].schema as JSONSchemaType,
    }
  })

const Response = z
  .object({
    description: z.string().optional(),
    content: z.object({
      'application/json': z.object({
        schema: z.unknown({}),
        example: z.any(),
      }),
    }),
  })
  .transform((response) => {
    return {
      description: response.description,
      schema: response.content['application/json'].schema as JSONSchemaType,
      example: response.content['application/json'].example,
    }
  })

export const Operation = z
  .object({
    operationId: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
    parameters: z.array(Parameter).optional(),
    requestBody: RequestBody.optional(),
    responses: z.record(Response),
  })
  .transform((operation) => {
    const parameters = groupBy(operation.parameters, 'in')
    const response = operation.responses['default']

    return { ...operation, parameters, response }
  })

export const Operations = z.record(Operation).transform((pathItem) => {
  return Object.entries(pathItem)
    .map(([method, operation]) => {
      const httpMethod = method.toUpperCase()
      if (isHttpMethod(httpMethod)) {
        return { [operation.operationId]: { ...operation, method: httpMethod } }
      }
    })
    .filter(isDefined)
})

const Paths = z.record(Operations).transform((paths) => {
  const denormalizedOperations = flatten(
    flatten(
      Object.entries(paths).map(([path, operations]) => {
        return Object.values(operations).map((operation) => {
          return Object.entries(operation).map(([operationId, value]) => {
            return { ...value, path, operationId }
          })
        })
      })
    )
  )

  type PathRecord = Record<string, typeof denormalizedOperations[number]>

  return denormalizedOperations.reduce((acc: PathRecord, operation: typeof denormalizedOperations[number]) => {
    return { ...acc, [operation.operationId]: operation }
  }, {})
})

export async function getContext(): Promise<{
  operations: any
  metadata: any
  schemas: Record<string, JSONSchemaType>
}> {
  const dereferencedSchema = Schema.parse(await OpenAPIParser.dereference(openApiJson as any))
  const paths = dereferencedSchema.paths
  const schemas = dereferencedSchema.components.schemas

  return { operations: Paths.parse(paths), metadata: Metadata.parse(metadataJson), schemas }
}
