<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
        <a-link
          href="https://github.com/Lantz-run/yuoj-frontend-lantz"
          style="color: white"
          target="_blank"
        >
          <icon-github style="margin-right: 4px; font-size: 18px" />
          LANTZ OJ
        </a-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
}

#basicLayout .content {
  /* 半透明遮罩 + 项目本地图片 */
  background: linear-gradient(
      rgba(194, 179, 179, 0.5),
      rgba(191, 170, 170, 0.5)
    ),
    url("@/assets/bg.jpg") 0% 0% / 100% 100% fixed;
  padding: 20px;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0);
  position: relative;
  z-index: 1;
}

#basicLayout .footer {
  background-color: #2b3a67; /* 深蓝色背景 */
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import { IconGithub } from "@arco-design/web-vue/es/icon";
</script>
