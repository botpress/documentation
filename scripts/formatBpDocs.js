const fs = require('fs')
const path = require('path')
// Path to your original OpenAPI JSON file
const inputFilePath = path.join(__dirname, '../public/static/openApi/openapi.json')
const outputFilePath = path.join(__dirname, '/botpress-openapi-output.json')

// List of allowed methods and paths
const allowedEndpoints = [
  { method: 'POST', path: '/v1/chat/users' },
  { method: 'GET', path: '/v1/chat/users/{id}' },
  { method: 'GET', path: '/v1/chat/users' },
  { method: 'POST', path: '/v1/chat/users/get-or-create' },
  { method: 'PUT', path: '/v1/chat/users/{id}' },
  { method: 'DELETE', path: '/v1/chat/users/{id}' },
  { method: 'POST', path: '/v1/chat/conversations' },
  { method: 'GET', path: '/v1/chat/conversations/{id}' },
  { method: 'GET', path: '/v1/chat/conversations' },
  { method: 'POST', path: '/v1/chat/conversations/get-or-create' },
  { method: 'PUT', path: '/v1/chat/conversations/{id}' },
  { method: 'DELETE', path: '/v1/chat/conversations/{id}' },
  { method: 'GET', path: '/v1/chat/conversations/{id}/participants' },
  { method: 'POST', path: '/v1/chat/conversations/{id}/participants' },
  { method: 'GET', path: '/v1/chat/conversations/{id}/participants/{userId}' },
  {
    method: 'DELETE',
    path: '/v1/chat/conversations/{id}/participants/{userId}',
  },
  { method: 'POST', path: '/v1/chat/events' },
  { method: 'GET', path: '/v1/chat/events/{id}' },
  { method: 'GET', path: '/v1/chat/events' },
  { method: 'POST', path: '/v1/chat/messages' },
  { method: 'POST', path: '/v1/chat/messages/get-or-create' },
  { method: 'GET', path: '/v1/chat/messages/{id}' },
  { method: 'PUT', path: '/v1/chat/messages/{id}' },
  { method: 'GET', path: '/v1/chat/messages' },
  { method: 'DELETE', path: '/v1/chat/messages/{id}' },
  { method: 'GET', path: '/v1/chat/states/{type}/{id}/{name}' },
  { method: 'POST', path: '/v1/chat/states/{type}/{id}/{name}' },
  { method: 'POST', path: '/v1/chat/states/{type}/{id}/{name}/get-or-set' },
  { method: 'PATCH', path: '/v1/chat/states/{type}/{id}/{name}' },
  { method: 'POST', path: '/v1/chat/actions' },
  { method: 'POST', path: '/v1/admin/bots' },
  { method: 'PUT', path: '/v1/admin/bots/{id}' },
  { method: 'GET', path: '/v1/admin/bots' },
  { method: 'GET', path: '/v1/admin/bots/{id}' },
  { method: 'DELETE', path: '/v1/admin/bots/{id}' },
  { method: 'GET', path: '/v1/admin/bots/{id}/logs' },
  { method: 'GET', path: '/v1/admin/bots/{id}/analytics' },
  { method: 'GET', path: '/v1/admin/bots/{id}/issues' },
  { method: 'DELETE', path: '/v1/admin/bots/{id}/issues/{issueId}' },
  { method: 'GET', path: '/v1/admin/bots/{id}/issues/{issueId}/events' },
  {
    method: 'GET',
    path: '/v1/tables',
  },
  {
    method: 'GET',
    path: '/v1/tables/{table}',
  },
  {
    method: 'POST',
    path: '/v1/tables/{table}',
  },
  {
    method: 'POST',
    path: '/v1/tables',
  },
  {
    method: 'POST',
    path: '/v1/tables/{sourceTableId}/duplicate',
  },
  {
    method: 'PUT',
    path: '/v1/tables/{table}',
  },
  {
    method: 'PUT',
    path: '/v1/tables/{table}/column',
  },
  {
    method: 'DELETE',
    path: '/v1/tables/{table}',
  },
  {
    method: 'GET',
    path: '/v1/tables/{table}/row',
  },
  {
    method: 'POST',
    path: '/v1/tables/{table}/rows/find',
  },
  {
    method: 'POST',
    path: '/v1/tables/{table}/rows',
  },
  {
    method: 'POST',
    path: '/v1/tables/{table}/rows/delete',
  },
  {
    method: 'PUT',
    path: '/v1/tables/{table}/rows',
  },
  {
    method: 'POST',
    path: '/v1/tables/{table}/rows/upsert',
  },
  {
    method: 'PUT',
    path: '/v1/files',
  },
  {
    method: 'DELETE',
    path: '/v1/files/{id}',
  },
  {
    method: 'GET',
    path: '/v1/files',
  },
  {
    method: 'GET',
    path: '/v1/files/{id}',
  },
  {
    method: 'PUT',
    path: '/v1/files/{id}',
  },
  {
    method: 'GET',
    path: '/v1/files/search',
  },
]

const blacklistedPaths = [
  '/v1/chat/tasks',
  '/v1/admin/helper/vrl',
  '/v1/admin/account/preferences',
  '/v1/admin/bots/{id}/transfer',
  '/v1/admin/bots/{id}/webchat',
  '/v1/admin/workspaces/{id}/billing',
  '/v1/admin/workspaces/usages/quota-completion',
  '/v1/admin/workspaces/handle-availability',
  '/v1/admin/interfaces',
  '/v1/admin/usages/multiple',
  '/v1/admin/quotas/ai-spend',
  '/v1/admin/activities',
  '/v1/admin/introspect',
]

const pathIncludesCategories = {
  '/chat/users': 'conversation users',
  '/conversations/{id}/participants': 'conversation participants',
  '/chat/conversations': 'conversations',
  '/chat/messages': 'conversation messages',
  '/chat/events': 'conversation events',
  '/chat/states': 'states',
  '/chat/actions': 'actions',
  '/admin/bots': 'bots',
  '/files': 'files',
  '/tables': 'tables',
  '/chat/integrations': 'integrations',
  '/admin/integrations/iaks': 'integrations',
  '/chat/analytics': 'conversations',
  '/admin/account': 'account management',
  '/admin/hub': 'hub',
  '/admin/workspaces': 'workspaces',
  '/admin/workspace-members': 'workspaces',
  '/admin/integrations': 'integrations',
  '/admin/usages': 'usages',
}

const workspaceHeader = {
  name: 'x-workspace-id',
  in: 'header',
  required: true,
  schema: {
    type: 'string',
  },
  description: 'Workspace ID',
}

const botHeader = {
  name: 'x-bot-id',
  in: 'header',
  required: true,
  schema: {
    type: 'string',
  },
  description: 'Bot ID',
}

const integrationHeader = {
  name: 'x-integration-id',
  in: 'header',
  required: true,
  schema: {
    type: 'string',
  },
  description: 'Integration ID',
}

const headerIncludesCategories = {
  '/chat/': [integrationHeader, botHeader],
  '/bots': [workspaceHeader],
  '/files': [botHeader, workspaceHeader],
  '/tables': [botHeader, workspaceHeader],
  '/admin/workspace-members': [workspaceHeader],
  '/admin/integrations': [workspaceHeader],
}

const getCategoryFromPath = (path) => {
  // for step 3

  for (const keyPath in pathIncludesCategories) {
    if (path.includes(keyPath)) {
      return pathIncludesCategories[keyPath].charAt(0).toUpperCase() + pathIncludesCategories[keyPath].slice(1)
    }
  }

  return 'unclassified' //example
}

const getHeadersFromPath = (path) => {
  for (const keyPath in headerIncludesCategories) {
    if (path.includes(keyPath)) {
      return headerIncludesCategories[keyPath]
    }
  }
  return []
}

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)
    return
  }
  // Parse the JSON data
  let openApiJson = JSON.parse(data)

  // todo 0 : remove all endpoints not found in the website

  const isAllowed = (method, path) => {
    return allowedEndpoints.some((endpoint) => {
      const pathRegex = new RegExp('^' + endpoint.path.replace(/{\w+}/g, '[^/]+') + '$')
      return endpoint.method === method && pathRegex.test(path)
    })
  }

  // Filter the paths in the openapi object
  for (const path in openApiJson.paths) {
    // for (const method in openApiJson.paths[path]) {
    //   if (!isAllowed(method.toUpperCase(), path)) {
    //     delete openApiJson.paths[path][method];
    //   }
    // }
    // if (Object.keys(openApiJson.paths[path]).length === 0) {
    //   delete openApiJson.paths[path];
    // }
    if (blacklistedPaths.some((blacklistedPath) => path.includes(blacklistedPath))) {
      delete openApiJson.paths[path]
    }
  }

  // ex. buildTheTable becomes Build The Table
  const convertCamelCaseToTitleCase = (camelCase) => {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  }

  // todo 1 : add authentication methods

  // openApiJson.components = openApiJson.components || {};
  // openApiJson.components.securitySchemes = {
  //   PATAuth: {
  //     type: "http",
  //     scheme: "bearer",
  //     bearerFormat: "PAT",
  //   },
  // };
  // openApiJson.security = [
  //   {
  //     PATAuth: [],
  //   },
  // ];

  for (const path in openApiJson.paths) {
    for (const method in openApiJson.paths[path]) {
      // todo 2 : add correct headers to each request
      if (!openApiJson.paths[path][method].parameters) {
        openApiJson.paths[path][method].parameters = []
      }

      const requiredHeaders = getHeadersFromPath(path)

      // loop and add each one which isn't already in
      requiredHeaders.forEach((header) => {
        if (!openApiJson.paths[path][method].parameters.some((param) => param.name === header.name)) {
          openApiJson.paths[path][method].parameters.push(header)
        }
      })

      // todo 3: classify each endpoint using "tags" so they are organized
      openApiJson.paths[path][method].tags = [getCategoryFromPath(path)]
    }
  }

  // for each endpoint/method set the summary to be the operationId (camelcase-> capitalized space)
  for (const path in openApiJson.paths) {
    for (const method in openApiJson.paths[path]) {
      const operationId = openApiJson.paths[path][method].operationId
      const titleCaseOperationId = convertCamelCaseToTitleCase(operationId)
      openApiJson.paths[path][method].summary = titleCaseOperationId
    }
  }

  for (const path in openApiJson.paths) {
    for (const method in openApiJson.paths[path]) {
      const parameters = openApiJson.paths[path][method].parameters

      // if there is a query parameter with schema.type === "object",
      // add “style”: “deepObject”, “explode”: true to the parameter
      if (parameters) {
        parameters.forEach((parameter) => {
          if (parameter.in === 'query' && parameter.schema && parameter.schema.type === 'object') {
            parameter.style = 'deepObject'
            parameter.explode = true
          }
        })
      }
    }
  }

  // Convert the updated JSON object back to string
  const updatedJson = JSON.stringify(openApiJson, null, 4)
  // Save the updated JSON to a new file
  fs.writeFile(outputFilePath, updatedJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err)
      return
    }
    console.log('Updated OpenAPI JSON saved to botpress-openapi-output.json')
  })
})
