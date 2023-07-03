import nextra from 'nextra'

const rewrites =
  process.env.ASSET_REWRITE === 'true'
    ? async () => [{ source: '/docs/_next/:path*', destination: '/_next/:path*' }]
    : undefined

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})

export default withNextra({
  basePath: '/docs',
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  reactStrictMode: true,
})
