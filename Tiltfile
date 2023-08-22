local_resource(
  name='pnpm-install',
  cmd='pnpm install',
  labels=['scripts'],
)

local_resource(
  name='generate-api',
  allow_parallel=True,
  cmd='pnpm generate',
  labels=['documentation'],
  resource_deps=['pnpm-install'],
  deps=['scripts/generateApiDocumentationPage.ts', 'scripts/generateApiDocumentationPage.constants.ts', 'scripts/generateApiDocumentationPage.types.ts'],
)

documentation_env = {
  'NEXT_PUBLIC_UNLEASH_APP_NAME': 'cdm',
  'NEXT_PUBLIC_UNLEASH_CLIENT_KEY': 'cdm:development.23c5337748c2fa1433ab463704660120ff4b3430451b3274ab53a909',
  'NEXT_PUBLIC_UNLEASH_URL': 'https://unleash.botpress.dev/proxy',
}

local_resource(
  name='documentation',
  allow_parallel=True,
  serve_cmd='pnpm dev',
  labels=['documentation'],
  resource_deps=['generate-api'],
  links=['http://localhost:3000'],
  serve_env=documentation_env,
)

local_resource(
  name='documentation-build',
  allow_parallel=True,
  labels=['documentation'],
  auto_init=False,
  cmd='pnpm build',
  env=documentation_env,
  resource_deps=['generate-api'],
)
