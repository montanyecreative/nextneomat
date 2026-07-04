// @storybook/nextjs internally requires next/config, which was removed in Next.js 16.
// This script writes a shim so Storybook can start without crashing.
const fs = require('fs')
const path = require('path')

const shimPath = path.resolve(__dirname, '../node_modules/next/config.js')
const shim = `const getConfig = () => ({ publicRuntimeConfig: {}, serverRuntimeConfig: {} })
module.exports = getConfig
module.exports.default = getConfig
`

fs.writeFileSync(shimPath, shim)
console.log('✓ Patched next/config shim for Storybook compatibility')
