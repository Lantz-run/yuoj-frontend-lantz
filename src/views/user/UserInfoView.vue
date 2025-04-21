<template>
  <div id="userInfoView">
    <a-space class="userDescription" direction="vertical" size="large" fill>
      <!-- 头像区域 -->
      <a-space class="avatarSpace">
        <img class="avatar" :src="userAvatarUrl" @error="handleImageError" />
      </a-space>

      <!-- 用户信息展示 -->
      <a-descriptions
        v-if="!loading"
        :data="infoData"
        layout="vertical"
        title="用户信息"
        :column="1"
        :label-style="{ textAlign: 'left', width: '100%' }"
        :content-style="{ textAlign: 'left' }"
        class="custom-descriptions"
      />

      <!-- 加载状态 -->
      <a-skeleton v-else :animation="true" :loading="loading">
        <a-skeleton-line :rows="4" />
      </a-skeleton>

      <!-- 操作按钮 -->
      <a-space class="changeMessage">
        <a-button type="primary" @click="EditData">修改资料</a-button>
      </a-space>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { UserControllerService } from "../../../generated";

const router = useRouter();

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
// 用户信息响应式对象
const userInfo = ref({
  id: "",
  userName: "",
  userEmail: "",
  userRole: "",
  userProfile: "",
  userAvatar: "",
  createTime: "",
  updateTime: "",
});

const loading = ref(true);
const error = ref("");

// 转换展示数据格式
const infoData = computed(() => [
  { label: "用户名", value: userInfo.value.userName },
  { label: "邮箱", value: userInfo.value.userEmail || "未绑定" },
  { label: "用户角色", value: mapUserRole(userInfo.value.userRole) },
  { label: "个人简介", value: userInfo.value.userProfile || "暂无简介" },
  { label: "注册时间", value: formatDate(userInfo.value.createTime) },
  { label: "最近更新时间", value: formatDate(userInfo.value.updateTime) },
]);

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await UserControllerService.getLoginUserUsingGet();
    userInfo.value = {
      ...res.data,
    } as any;
  } catch (err) {
    Message.error("获取用户信息失败");
    error.value = "无法加载用户信息";
  } finally {
    loading.value = false;
  }
};

// 角色映射
const mapUserRole = (role: string) => {
  const roles: { [key: string]: string } = {
    admin: "管理员",
    user: "普通用户",
  };
  return roles[role] || "未知角色";
};

// 日期格式化
const formatDate = (dateString: string) => {
  if (!dateString) return "未知时间";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 进入编辑页面
const EditData = () => {
  router.push("/update/message");
};

// 组件挂载时获取数据
onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
#userInfoView {
  display: flex;
  justify-content: center; /* 左对齐容器 */
}

.userDescription {
  /* 半透明遮罩 + 项目本地图片 */
  background: linear-gradient(
      rgba(219, 219, 219, 0.6),
      rgba(219, 219, 219, 0.6)
    ),
    url("@/assets/images/infoBg.jpg") 0% 0% / cover no-repeat;
  width: 100%; /* 改为固定宽度 */
  max-width: 600px; /* 根据需求调整 */
  height: auto;
  padding: 20px;
}

/* 新增自定义描述列表样式 */
.custom-descriptions :deep(.arco-descriptions-item-label) {
  font-weight: bold;
  color: #000000;
  padding: 8px 0 !important;
}

/* 添加标题装饰线 */
.custom-descriptions :deep(.arco-descriptions-title) {
  font-weight: bold;
  position: relative;
  padding-left: 12px;
}

.custom-descriptions :deep(.arco-descriptions-title)::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background-color: #3498db;
  border-radius: 2px;
}

.custom-descriptions :deep(.arco-descriptions-item-content) {
  padding: 8px 0 !important;
}

.avatar {
  width: 100px;
  height: 100px;
  margin-left: 2px;
  margin-top: 2px;
  /* 新增以下两行 */
  border-radius: 50%; /* 圆形关键代码 */
  overflow: hidden; /* 确保图片不会溢出圆形区域 */
  transition: transform 0.5s ease;

  /* 可选增强效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加柔和阴影 */
  border: 2px solid #fff; /* 添加白色边框 */
}

.avatar:hover {
  transform: scale3d(0.9, 0.9, 0.9);
}
</style>
