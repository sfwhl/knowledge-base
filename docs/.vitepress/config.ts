import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '个人知识库',
  description: 'Function Call, MCP, Skills 知识沉淀',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    // 导航栏 - 3 个 TAB
    nav: [
      { text: '首页', link: '/' },
      { text: 'Function Call', link: '/fc/' },
      { text: 'MCP', link: '/mcp/' },
      { text: 'Skills', link: '/skills/' }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/fc/': [
        {
          text: 'Function Call',
          items: [
            { text: '入门指南', link: '/fc/intro' },
            { text: '完整示例', link: '/fc/example' }
          ]
        }
      ],
      '/mcp/': [
        {
          text: 'MCP',
          items: [
            { text: '协议详解', link: '/mcp/intro' },
            { text: 'Server 实现', link: '/mcp/server' }
          ]
        }
      ],
      '/skills/': [
        {
          text: 'Skills',
          items: [
            { text: '技能开发', link: '/skills/dev' },
            { text: '技能示例', link: '/skills/example' }
          ]
        }
      ]
    },
    
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索知识库'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除搜索条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    
    // 社交链接
    socialLinks: [
      { 
        icon: 'github', 
        link: 'https://github.com/your-username/knowledge-base' 
      }
    ],
    
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present 王会龙'
    }
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },
  
  // 构建配置
  build: {
    outDir: '.vitepress/dist'
  }
})
