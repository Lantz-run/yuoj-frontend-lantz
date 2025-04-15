<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/Oj-Logo.svg" class="logo" />
          <div style="color: black">Lantz OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a-link
          href="https://github.com/Lantz-run"
          target="_blank"
          style="color: #1b1b1b; font-weight: bolder"
        >
          欢迎来到 Lantz OJ
        </a-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: linear-gradient(
      rgba(194, 179, 179, 0.4),
      rgba(191, 170, 170, 0.4)
    ),
    url("@/assets/UserBg.jpg") 0% 0% / 100% 100% fixed;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: rgba(158, 122, 191, 0.43);
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts"></script>
