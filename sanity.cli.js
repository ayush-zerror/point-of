/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineCliConfig } from 'sanity/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aksv9uid"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineCliConfig({
  api: { projectId, dataset },
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }),
})
