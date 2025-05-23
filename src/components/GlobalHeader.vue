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
              <img class="logo" src="../assets/Oj-Logo.png" />
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
            <!-- 已登录状态 -->
            <template v-if="loginUser">
              <a-dropdown>
                <a-avatar
                  id="userAvatar"
                  :style="{ backgroundColor: '#00BCD4' }"
                  trigger-type="mask"
                >
                  <img
                    class="avatar-image"
                    alt="avatar"
                    :src="userAvatarUrl"
                    @error="handleImageError"
                  />
                </a-avatar>
                <template #content>
                  <a-doption @click="handleUserInfo">
                    <icon-user :style="{ marginRight: '6px' }" />
                    个人主页
                  </a-doption>

                  <a-doption @click="handleLogout" style="color: #cb0f0f">
                    <icon-export :style="{ marginRight: '6px' }" />
                    退出登录
                  </a-doption>
                </template>
              </a-dropdown>
            </template>

            <!-- 未登录状态 -->
            <template v-else>
              <div class="unLogin-text">
                <a-link href="/user/login" style="color: #000000"></a-link>
                <a-link href="/user/login" style="color: #efefef"
                  >未登录
                </a-link>
              </div>
            </template>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { UserControllerService, UserUpdateRequest } from "../../generated";
import checkAccess from "@/access/CheckAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import message from "@arco-design/web-vue/es/message";
import { IconUser, IconExport } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const store = useStore();

// 用户头像地址
const userAvatarUrl = ref("");

// 默认头像地址（当数据库没有头像时使用）
const defaultAvatar = "@/assets/avatar/ava01.jpg";

// 加载用户数据
const loadUserData = async () => {
  try {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0 && res.data) {
      // 拼接完整头像地址
      userAvatarUrl.value = res.data.userAvatar
        ? res.data.userAvatar
        : defaultAvatar;
    }
  } catch (err) {
    console.error("获取用户信息失败:", err);
    userAvatarUrl.value = defaultAvatar;
  }
};

// 处理图片加载失败
const handleImageError = () => {
  userAvatarUrl.value = defaultAvatar;
};
// 组件挂载时加载数据
onMounted(() => {
  loadUserData();
});

const form = reactive({
  userName: "",
  userEmail: "",
  userAvatar: "",
  userProfile: "",
  userRole: "",
} as UserUpdateRequest);

const isMenuVisible = ref(false);

const getDefaultState = () => {
  return {
    loginUser: {
      userName: "未登录",
    },
  };
};

const loginUser = computed(() => {
  const user = store.state.user?.loginUser;
  return user?.userRole !== ACCESS_ENUM.NOT_LOGIN;
});

const handleUserInfo = () => {
  setTimeout(() => {
    router.push("/Info");
  }, 50);
};

// 退出登录
const handleLogout = () => {
  message.success("用户" + store.state.user.loginUser.userName + "已退出登录");
  UserControllerService.userLogoutUsingPost();
  // 方法一
  // store.state.user.loginUser = ACCESS_ENUM.NOT_LOGIN;
  // 方法二
  store.state.user = getDefaultState();
  // 注销就返回登录页
  setTimeout(() => {
    router.push("/user/login");
  }, 50);
};

// 初始化时获取登陆状态
store.dispatch("user/login");

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
  width: 48px;
}

.avatar {
  margin-right: 8px;
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
