import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { myDeskStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'blackthorn-final',

  projectId: 'ubte0m8k',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myDeskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})