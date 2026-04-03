export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description shown on blog listing page'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Google Ads', value: 'google-ads' },
          { title: 'Meta Ads', value: 'meta-ads' },
          { title: 'SEO', value: 'seo' },
          { title: 'AI Tools', value: 'ai-tools' },
          { title: 'Career Tips', value: 'career-tips' },
          { title: 'Campaign Strategy', value: 'campaign-strategy' },
        ]
      }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'publishedAt' }
  }
}