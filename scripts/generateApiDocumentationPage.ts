import * as fs from 'fs'
import { startCase } from 'lodash'
import { state } from '@botpress/api'
import {
  API_DOCS_AUTHENTICATION,
  API_DOCS_CLIENT,
  API_DOCS_ERROR_DESCRIPTION,
  API_DOCS_INTRO,
  API_DOCS_PAGINATION,
  API_REQUIRED_BOT_ID_HEADER,
  API_REQUIRED_INTEGRATION_ID_HEADER,
  API_REQUIRED_WORKSPACE_ID_HEADER,
  DONT_EDIT_WARNING,
} from './generateApiDocumentationPage.constants'
import { JSONSchemaProperty, JSONSchemaType, Parameter, ParameterSchema } from './generateApiDocumentationPage.types'
import { getContext } from './openApiContext'

type Operation = keyof (typeof state)['operations']

const VisibleOperations: Operation[] = [
  // User
  'createUser',
  'getUser',
  'listUsers',
  'getOrCreateUser',
  'updateUser',
  'deleteUser',

  // Conversation
  'createConversation',
  'getConversation',
  'listConversations',
  'getOrCreateConversation',
  'updateConversation',
  'deleteConversation',

  // Participant
  'listParticipants',
  'addParticipant',
  'getParticipant',
  'removeParticipant',

  // Event
  'createEvent',
  'getEvent',
  'listEvents',

  // Message
  'createMessage',
  'getOrCreateMessage',
  'getMessage',
  'updateMessage',
  'listMessages',
  'deleteMessage',

  // State
  'getState',
  'setState',
  'getOrSetState',
  'patchState',

  // Action
  'callAction',

  // Tables
  'listTables',
  'getTable',
  'getOrCreateTable',
  'createTable',
  'duplicateTable',
  'updateTable',
  'renameTableColumn',
  'deleteTable',
  'getTableRow',
  'findTableRows',
  'createTableRows',
  'deleteTableRows',
  'updateTableRows',
  'upsertTableRows',

  // Integrations
  'createIntegration',
  'getIntegration',
  'getIntegrationByName',
  'updateIntegration',
  'deleteIntegration',
  'listIntegrations',

  // Hub
  'listPublicIntegrations',
  'getPublicIntegrationById',
  'getPublicIntegration',

  // Bots
  'createBot',
  'getBot',
  'updateBot',
  'deleteBot',
  'listBots',
  'listBotIssues',
  'listBotIssueEvents',
  'deleteBotIssue',
  'getBotLogs',
  'getBotAnalytics',

  // Files
  'upsertFile',
  'updateFileMetadata',
  'getFile',
  'deleteFile',
  'listFiles',
  'searchFiles',
]

const SectionsWithRequiredWorkspaceIdHeader = ['bot', 'integration', 'workspaceMember']
const SectionsWithRequiredBotIdHeader = ['user', 'conversation', 'event', 'message', 'file', 'state', 'action']
const SectionsWithRequiredIntegrationIdHeader = ['user', 'conversation', 'event', 'message', 'file', 'state', 'action']

type Section = {
  name: string
  title: string
  description: string
  operations: string[]
  schema?: string
}

async function getApiDocumetationPageContent(): Promise<string> {
  const context = await getContext()
  let md = `${DONT_EDIT_WARNING}\n\n`
  md += 'import { EndpointBlock } from "@components/EndpointBlock"; \n\n'
  md += 'import { Collapsible } from "@components/Collapsible"; \n\n'
  md += 'import { H4 } from "@components/WrapperElements"; \n\n'
  md += '# Botpress API Documentation \n'
  md += API_DOCS_INTRO
  md += API_DOCS_CLIENT
  md += API_DOCS_AUTHENTICATION
  md += API_DOCS_PAGINATION
  md += API_DOCS_ERROR_DESCRIPTION + '\n\n'

  context.metadata.errors.forEach((error: any) => {
    md += `<H4> ${startCase(error.type)} </H4> \n\n`
    md += `\`\`\`json \n ${JSON.stringify(error, undefined, 2)}\n \`\`\` \n\n`
  })

  context.metadata.sections.forEach((section: Section) => {
    if (section.operations.findIndex((operation) => VisibleOperations.includes(operation as Operation)) === -1) {
      console.info(`Skipping section "${section.name}" of API documentation because it's marked as hidden`)
      return
    }

    const endpointRoutes = section.operations
      .filter((operationId) => VisibleOperations.includes(operationId as Operation))
      .map((operationId: string) => {
        const { method, path } = context.operations[operationId]
        return { method, path }
      })

    const routesVariableName = `routes_${section.name}`

    md += `## ${section.title} \n`
    md += `${section.description} \n\n`
    md += `export const ${routesVariableName} = ${JSON.stringify(endpointRoutes)} \n\n`
    md += `<EndpointBlock title={"Endpoints"} endpoints={${routesVariableName}} /> \n\n`

    const hasRequiredWorkspaceIdHeader = SectionsWithRequiredWorkspaceIdHeader.includes(section.name)
    const hasRequiredBotIdHeader = SectionsWithRequiredBotIdHeader.includes(section.name)
    const hasRequiredIntegrationIdHeader = SectionsWithRequiredIntegrationIdHeader.includes(section.name)
    const hasRequiredHeaders = hasRequiredWorkspaceIdHeader || hasRequiredBotIdHeader || hasRequiredIntegrationIdHeader

    if (hasRequiredHeaders) {
      md +=
        '### Required Headers \n\n' +
        'To access these API endpoints the following HTTP headers are required to be passed in all requests:'

      if (hasRequiredWorkspaceIdHeader) {
        md += API_REQUIRED_WORKSPACE_ID_HEADER(section.title)
      }

      if (hasRequiredBotIdHeader) {
        md += API_REQUIRED_BOT_ID_HEADER(section.title)
      }

      if (hasRequiredIntegrationIdHeader) {
        md += API_REQUIRED_INTEGRATION_ID_HEADER
      }
    }

    if (section.schema) {
      // Custom link for the heading
      md += `### The ${section.schema} object [#schema_${section.schema?.toLowerCase()}] \n\n`
      md += '<H4> Attributes </H4>\n\n'
      md += getJsonSchemaMarkDown(context.schemas[section.schema])
    }

    section.operations
      .filter((operationId) => VisibleOperations.includes(operationId as Operation))
      .forEach((operationId: string) => {
        const operation = context.operations[operationId]
        md += `### ${startCase(operationId)}\n\n`
        const { method, path } = context.operations[operationId]
        md += `<EndpointBlock className="mt-2" endpoints={[${JSON.stringify({ method, path })}]} />\n\n`
        md += `${operation.description} \n\n`
        Object.entries(operation.parameters).forEach(([location, parameters]: [string, any]) => {
          md += `<H4> ${startCase(location)} </H4> \n\n`
          if (Array.isArray(parameters)) {
            parameters.forEach((p) => {
              const parameter = ParameterSchema.parse(p)
              md += `<Collapsible className="mt-3" collapsible={false} defaultCollapsed={${!Boolean(
                parameter.description
              )}}>\n\n`
              md += getParameterMd(parameter)
              md += '</Collapsible>\n\n'
            })
          }
        })
        if (operation.requestBody) {
          md += '<H4> Body </H4>\n\n'
          md += getJsonSchemaMarkDown(operation.requestBody.schema) + '\n\n'
        }

        md += '<H4> Response </H4> \n\n'
        md += `${operation.response?.description || ''} \n\n`
        md += getJsonSchemaMarkDown(operation.response.schema) + '\n\n'
      })
  })

  return md
}

/**
 *
 * @param schema
 * @param isCollapsible is incremented as we go deeper in the schema
 * @returns the markdown representation of the schema
 */
function getJsonSchemaMarkDown(schema: JSONSchemaType): string {
  const flattenedProperties = getNormalizedProperties(schema)

  if (flattenedProperties) {
    return Object.entries(flattenedProperties).reduce((md, [name, property]) => {
      if (property.deprecated) {
        console.info(`Skipping deprecated property "${name}" of schema "${schema.title}"`)
        return md
      }

      const flattenedSubProperties = property.type === 'object' ? getNormalizedProperties(property) : false

      md += `<Collapsible className="mt-3" isCollapsible={${Boolean(
        flattenedSubProperties
      )}} defaultCollapsed={${Boolean(flattenedSubProperties)}}>\n\n`

      switch (property.type) {
        case 'object': {
          md += getPropertyMdWithDescription(
            name,
            property,
            Boolean(flattenedSubProperties) ? `(${Object.keys(flattenedSubProperties).length})` : undefined
          )
          if (flattenedSubProperties) {
            // recurse while incrementing the nesting
            md += `${getJsonSchemaMarkDown(property)}`
          }
          break
        }
        case 'array': {
          md += getPropertyMdWithDescription(name, property)
          if (property.items.type === 'object') {
            md += getJsonSchemaMarkDown(property.items)
          }
          break
        }
        default:
          md += getPropertyMdWithDescription(name, property)
          break
      }
      md += '</Collapsible>\n\n'
      return md
    }, '')
  }
  return ''
}

function getPropertyMdWithDescription(
  name: string,
  property: JSONSchemaProperty,
  supplementaryHeadingMarkdown: string = ''
) {
  let md = ''
  md += `\`\`\`${name}\`\`\` : ${getPropertyType(property)} ${supplementaryHeadingMarkdown} \n\n`
  md += `${property?.description || ''}\n\n`
  if (property.type === 'array' && property.items.type === 'string' && property.items.enum) {
    md += `Possible values for array items: ${property.items.enum.map((v) => `\`${v}\``).join(', ')}\n`
  } else if (property.type === 'string' && property.enum) {
    md += `Possible values: ${property.enum.map((v) => `\`${v}\``).join(', ')}\n`
  }
  md += '\n'
  return md
}

function getParameterMd({ name, schema, description }: Parameter) {
  let md = ''
  md += `\`\`\`${name}\`\`\` : ${getPropertyType(schema)} \n\n`
  md += `${description || ''}\n`
  return md
}

export function getPropertyType(property: JSONSchemaProperty | Parameter['schema']): string {
  if (!('type' in property) || !property?.type) {
    return ''
  }
  if (property.type === 'object' && property.additionalProperties) {
    return 'object of key-value pairs'
  }
  if (property.type === 'array') {
    return `${property.type} of ${property.items?.type || 'string'}`
  }
  return property.type
}

/**
 * @returns the `additionalProperties` if available, otherwise the properties
 */
export function getNormalizedProperties(jsonSchema: JSONSchemaType): Record<string, JSONSchemaProperty> {
  if (
    jsonSchema.additionalProperties &&
    typeof jsonSchema.additionalProperties !== 'boolean' &&
    jsonSchema.additionalProperties.type === 'object'
  ) {
    return jsonSchema.additionalProperties.properties
  }
  return jsonSchema.properties
}

getApiDocumetationPageContent().then((context) => {
  fs.writeFileSync('./pages/api-documentation/index.mdx', context)
})
