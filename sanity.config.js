import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import blogPost from './sanity/schemas/blogPost'

export default defineConfig({
  name: 'digitalwithchirag',
  title: 'DigitalWithChirag Blog',

  // 🔴 REPLACE THESE with your actual values from sanity.io/manage
  projectId: '8z8bwght',
  dataset: 'production',
  basePath: '/studio',

  plugins: [structureTool(), visionTool()],
  schema: {
    types: [blogPost],
  },
})