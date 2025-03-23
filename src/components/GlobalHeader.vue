<template>
  <div class="header">
    <a-row id="globalHeader" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/Oj-Logo.svg" />
              <div class="title">Lantz OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div class="avatar">
          <a-space size="large">
            <router-link to="/Info">
              <a-avatar trigger-type="mask">
                <img alt="avatar" :src="require('@/assets/avatar/ava01.jpg')" />
                <template #trigger-icon>
                  <IconEdit />
                </template>
              </a-avatar>
            </router-link>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, handleError, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;
// 默认主页
const selectedKeys = ref(["/"]);

// 显示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "LantzAdmin",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  background-color: #2b3a67; /* 深蓝色背景 */
  display: flex;
  align-items: center;
}

.title {
  color: chocolate;
  margin-left: 14px;
}

.logo {
  height: 48px;
}

/* 修改头部背景色 */
.header {
  background-color: #2b3a67; /* 深蓝色背景 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影增强层次感 */
}

/* 修改菜单项颜色 */
#globalHeader :deep(.arco-menu-horizontal) {
  background-color: transparent !important; /* 使菜单背景透明 */
}

#globalHeader :deep(.arco-menu-item) {
  color: rgba(72, 192, 228, 0.85) !important; /* 菜单文字颜色 */
  transition: all 0.3s ease;
}

/* 用户名显示样式 */
#globalHeader > .arco-col:last-child > div {
  color: #fff;
  padding: 0 12px;
}
</style>
