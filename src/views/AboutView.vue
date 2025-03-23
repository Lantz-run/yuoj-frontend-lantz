<template>
  <div class="about">
    <h1 class="title">在线判题系统 (Online Judge)</h1>

    <a-space class="content-wrapper" direction="vertical" :size="24">
      <!-- 项目简介 -->
      <a-typography>
        <a-typography-title :level="3">🏆 项目概述</a-typography-title>
        <a-typography-paragraph class="description">
          本OJ系统是一个面向编程竞赛和算法学习的在线判题平台，目前支持java，cpp编程语言即时编译执行，
          提供实时反馈运行结果分析。系统包含题目管理、在线提交、代码评测、用户信息等功能。OJ系统用于在线评判编程题目代码的系统，
          能够根据用户提交的代码、出题人预先设置的题目输入和输出用例，进行编译代码、运行代码、判断代码运行结果是否正确
        </a-typography-paragraph>
      </a-typography>

      <!-- 核心功能 -->
      <div class="feature-section">
        <a-typography-title :level="3">✨ 核心功能</a-typography-title>
        <a-list>
          <a-list-item>
            <a-list-item-meta
              title="编程语言功能"
              description="支持C++/Java语言提交"
            >
            </a-list-item-meta>
            <a-list-item-meta
              title="检测代码"
              description="实时代码评测与结果反馈"
            >
            </a-list-item-meta>
            <a-list-item-meta
              title="代码沙箱"
              description="沙箱安全执行环境, 代码在一个隔离的、安全的环境，用户的代码不会影响到沙箱之外的系统运行"
            >
            </a-list-item-meta>
            <a-list-item-meta title="题目分级" description="题目分类与难度分级">
            </a-list-item-meta>
            <a-list-item-meta
              title="提交题目"
              description="用户提交题目历史记录以及题目的通过率"
            >
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>

      <!-- 技术栈 -->
      <div class="tech-stack">
        <a-typography-title :level="3">🛠️ 技术栈</a-typography-title>
        <a-typography-paragraph
          >前端：Vue3 / Arco Design Vue<br />
          后端：Spring Boot2<br />
          判题语言：java / C++<br />
          沙箱隔离：Docker容器化 / Java 原生代码沙箱 / Java 安全管理器<br />
          辅助技术：RabbitMQ 异步队列、Redis 缓存、MySQL 数据库
        </a-typography-paragraph>
        <a-space :size="12" wrap>
          <a-tag color="blue">Vue 3</a-tag>
          <a-tag color="cyan">Ant Design Vue</a-tag>
          <a-tag color="red">Node.js</a-tag>
          <a-tag color="purple">Docker</a-tag>
          <a-tag color="green">MySQL</a-tag>
          <a-tag color="orange">RabbitMQ</a-tag>
          <a-tag color="pinkpurple">Spring Cloud Alibaba</a-tag>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script setup></script>

<style scoped>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.title {
  text-align: center;
  color: #1f2f3d;
  margin-bottom: 32px;
}

.content-wrapper {
  width: 100%;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: #4a5568;
}

.feature-section {
  margin-top: 20px;
}

.tech-stack {
  margin-top: 28px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about {
    padding: 12px;
  }

  .content-wrapper {
    padding: 16px;
  }
}
</style>
