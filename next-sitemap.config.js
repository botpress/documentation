/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://botpress.com/docs',
  generateRobotsTxt: true,
}
