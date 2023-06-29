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
  resource_deps=['pnpm-install']
)

local_resource(
  name='documentation',
  allow_parallel=True,
  serve_cmd='pnpm dev',
  labels=['documentation'],
  resource_deps=['pnpm-install']
)
