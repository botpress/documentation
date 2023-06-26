import { createOpenApi } from '@botpress/api/openapi'

const api = createOpenApi()
void api.exportOpenapi('./public/static/openApi')
