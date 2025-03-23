<template>
  <div class="article-card">
    <a-card hoverable class="welcome">
      <div class="welcome-contain">
        <a-space class="welcome-content">
          <h2>Welcome to LANTZ OJ</h2>
          <img
            alt="course cover"
            class="image"
            src="@/assets/images/welcome.jpg"
          />
        </a-space>
      </div>
    </a-card>
    <a-card hoverable class="responseCard">
      <div class="card-content">
        <!-- 左侧文本区域 -->
        <div class="text-section">
          <a-space class="click-area" @click="handleClick">Click</a-space>
          <h1 class="title">OJ项目介绍</h1>
          <h2 class="subtitle">LANTZ OJ</h2>

          <a-divider class="divider" />

          <div class="meta-section">
            <span class="publish-date">发布于 2025-03-10</span>
          </div>

          <div class="bottom-meta">
            <div class="meta-item">
              <icon-eye class="icon" />
              <span>{{ heat }} 热度</span>
            </div>
            <div class="meta-item">
              <icon-tag class="icon" />
              <span>BLR</span>
            </div>
          </div>
        </div>

        <!-- 右侧图片区域 -->
        <div class="image-section">
          <div class="image-wrapper">
            <router-link to="/about"
              ><img
                src="@/assets/images/p3.jpg"
                alt="course cover"
                class="cover-image"
            /></router-link>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
// 修改后的完整 script 部分
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { IconEye, IconTag } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const heat = ref(120);

const handleClick = () => {
  // 添加跳转延迟确保DOM更新
  setTimeout(() => {
    router.push("/about");
  }, 50);
};
</script>

<style scoped>
.welcome {
  width: 100%;
  text-align: center; /* 全局文字居中 */
  background-color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 元素间距 */
}

.image {
  width: 60vw; /* 视口宽度的60% */
  height: auto; /* 保持宽高比 */
  max-width: 90%; /* 防止溢出 */
  margin: 0 auto; /* 关键改动 */
  border-radius: 4px;
  overflow: hidden;
  object-fit: cover; /* 保持图片完整比例 */
  transition: transform 0.5s;
}

.image:hover {
  transform: scale(1.05);
}

h2 {
  color: #1c4dc9;
  margin: 0; /* 移除默认外边距 */
  width: 100%; /* 确保标题容器宽度满屏 */
}

.click-area {
  color: #30acd4;
}

.article-card {
  margin-left: 200px;
  max-width: 800px;
  margin: 0 auto;
}

.responseCard {
  background-color: rgba(226, 224, 224, 0.68);
  width: 100% !important; /* 重要：覆盖原有固定宽度 */
  min-width: 300px; /* 最小宽度限制 */
}

.card-content {
  display: flex;
  gap: 24px;
  cursor: pointer;
  justify-content: space-between;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1d2129;
}

.subtitle {
  font-size: 18px;
  color: #4e5969;
  margin-bottom: 20px;
}

.divider {
  margin: 16px 0;
}

.meta-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.publish-date {
  color: #86909c;
  font-size: 12px;
}

.tag {
  border-radius: 4px;
  font-weight: 500;
}

.bottom-meta {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

.meta-item {
  display: flex;
  align-items: center;
  color: #86909c;
  font-size: 12px;
}

.icon {
  margin-right: 4px;
  font-size: 14px;
}

.image-section {
  flex: 0 0 45%;
}

.image-wrapper {
  width: 100%;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.cover-image:hover {
  transform: scale(1.05);
}
</style>
