import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  // 🔴 REPLACE THESE with your actual values from sanity.io/manage
  projectId: '8z8bwght',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// Fetch all blog posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      coverImage
    }
  `)
}

// Fetch single post by slug
export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      coverImage,
      body
    }
  `, { slug })
}