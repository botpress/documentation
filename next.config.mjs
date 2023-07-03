import nextra from 'nextra'
import withImages from 'next-images'

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
  reactStrictMode: true,
  ...withImages({
    inlineImageLimit: false,
    assetPrefix: '/docs',
  }),
})
