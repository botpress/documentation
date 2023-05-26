const withNextra = require("nextra")({
  basePath: "/docs",
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  reactStrictMode: true,
});
