import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', {
  excerpt: true,
  transform(rawData) {
    const filtered = rawData
      .filter(({ url }) => {
        // 只包含特定分类的文章，排除首页
        return (
          ['fc', 'mcp', 'skills'].some(cat => 
            url.startsWith(`/${cat}/`)
          ) &&
          url !== '/'
        )
      })
      .map(({ url, frontmatter, excerpt }) => ({
        ...frontmatter,
        url,
        excerpt
      }))
      .filter((post) => post.title) // 必须有标题
      .sort((a, b) => {
        // 按日期降序排序
        return new Date(b.date || 0) - new Date(a.date || 0)
      })
    
    return filtered
  }
})
