<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.js'

const activeTab = ref('all')
const currentPage = ref(1)
const selectedTags = ref([])
const postsPerPage = 12

const tabLabels = {
  all: '全部',
  'function-call': 'Function Call',
  mcp: 'MCP',
  skills: 'Skills'
}

// 获取所有标签
const allTags = computed(() => {
  const tags = new Set()
  posts.value.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// 过滤文章
const filteredPosts = computed(() => {
  let result = posts.value
  
  // 按 TAB 过滤
  if (activeTab.value !== 'all') {
    result = result.filter(post => post.category === activeTab.value)
  }
  
  // 按标签过滤
  if (selectedTags.value.length > 0) {
    result = result.filter(post => 
      selectedTags.value.every(tag => post.tags?.includes(tag))
    )
  }
  
  return result
})

// 分页
const totalPages = computed(() => 
  Math.ceil(filteredPosts.value.length / postsPerPage)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  currentPage.value = 1
}
</script>

<template>
  <div class="knowledge-home">
    <!-- TAB 导航 -->
    <div class="tabs">
      <button
        v-for="(label, key) in tabLabels"
        :key="key"
        :class="{ active: activeTab === key }"
        @click="activeTab = key; currentPage = 1"
      >
        {{ label }}
      </button>
    </div>
    
    <!-- 标签过滤 -->
    <div class="tag-filter" v-if="allTags.length > 0">
      <span 
        v-for="tag in allTags" 
        :key="tag"
        :class="{ active: selectedTags.includes(tag) }"
        @click="toggleTag(tag)"
      >
        #{{ tag }}
      </span>
    </div>
    
    <!-- 文章统计 -->
    <div class="stats">
      共 {{ filteredPosts.length }} 篇文章
      <span v-if="selectedTags.length > 0">
        （已过滤：{{ selectedTags.join(', ') }}）
      </span>
    </div>
    
    <!-- 卡片列表 -->
    <div class="card-grid" v-if="paginatedPosts.length > 0">
      <a 
        v-for="post in paginatedPosts" 
        :key="post.url"
        :href="post.url"
        class="card"
      >
        <div class="card-category">{{ tabLabels[post.category] || post.category }}</div>
        <h3 class="card-title">{{ post.title }}</h3>
        <p class="card-summary">{{ post.summary || post.excerpt }}</p>
        <div class="card-tags" v-if="post.tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
        <div class="card-meta">
          <span class="date">{{ post.date }}</span>
          <span class="read-time">{{ post.readTime || 5 }} min read</span>
        </div>
      </a>
    </div>
    
    <!-- 空状态 -->
    <div class="empty-state" v-else>
      <p>暂无内容</p>
    </div>
    
    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        ← 上一页
      </button>
      
      <div class="page-numbers">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
          class="page-number"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        下一页 →
      </button>
    </div>
  </div>
</template>

<style scoped>
.knowledge-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
}

.tabs button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;
  border-radius: 6px;
}

.tabs button:hover {
  background: #f3f4f6;
}

.tabs button.active {
  color: #3b82f6;
  background: #eff6ff;
}

.tag-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tag-filter span {
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-filter span:hover {
  background: #e5e7eb;
}

.tag-filter span.active {
  background: #3b82f6;
  color: white;
}

.stats {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
  background: white;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: #3b82f6;
}

.card-category {
  font-size: 0.75rem;
  color: #3b82f6;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
  line-height: 1.4;
}

.card-summary {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f9fafb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #9ca3af;
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.page-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  min-width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.page-number:hover {
  background: #f3f4f6;
}

.page-number.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}
</style>
