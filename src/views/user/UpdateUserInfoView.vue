<template>
  <div id="updateUserInfoView">
    <a-space class="userDescription" direction="vertical" size="large" fill>
      <div class="content-wrapper">
        <div class="header">
          <h2>修改资料</h2>
        </div>

        <a-descriptions class="userInfo" layout="vertical" :column="1" bordered>
          <a-form
            style="max-width: 500px; margin: 0 auto"
            label-align="left"
            auto-label-width
            :model="form"
          >
            <!-- 昵称 -->
            <a-form-item field="userName" label="昵称">
              <a-input v-model="form.userName" placeholder="请输入昵称" />
            </a-form-item>

            <!-- 角色 -->
            <a-form-item field="userRole" label="用户角色">
              <a-radio-group v-model="form.userRole">
                <a-radio value="user">用户</a-radio>
                <a-radio value="admin">管理员</a-radio>
              </a-radio-group>
            </a-form-item>

            <!-- 简介 -->
            <a-form-item field="userProfile" label="简介">
              <a-textarea
                v-model="form.userProfile"
                placeholder="请输入个人简介"
                :auto-size="{ minRows: 3 }"
              />
            </a-form-item>

            <!-- 邮箱 -->
            <a-form-item field="userEmail" label="邮箱">
              <a-input v-model="form.userEmail" placeholder="请输入邮箱" />
            </a-form-item>
          </a-form>
        </a-descriptions>

        <!-- 操作按钮 -->
        <a-space style="margin-top: 20px; justify-content: flex-end">
          <a-button type="primary" :loading="saving" @click="saveChanges">
            保存
          </a-button>
          <a-button @click="cancelEdit">取消</a-button>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { UserControllerService, UserUpdateRequest } from "../../../generated";
import { useRouter } from "vue-router";

const form = reactive({
  userName: "",
  userEmail: "",
  userAvatar: "",
  userProfile: "",
  userRole: "",
} as UserUpdateRequest);

const isEditing = ref(false);
const saving = ref(false);
const router = useRouter();

// 初始化加载数据
onMounted(async () => {
  try {
    const res = await UserControllerService.getLoginUserUsingGet();
    Object.assign(form, res.data);
  } catch (error) {
    Message.error("获取用户信息失败");
  }
});

// 取消编辑
const cancelEdit = () => {
  setTimeout(() => {
    router.push("/Info");
  }, 50);
};

// 保存修改
const saveChanges = async () => {
  try {
    saving.value = true;
    await UserControllerService.updateUserUsingPost(form);
    Message.success("修改保存成功");
    isEditing.value = false;
  } catch (error) {
    Message.error("保存失败，请稍后重试");
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
#updateUserInfoView {
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(
    rgba(176, 212, 105, 0.6),
    rgba(68, 175, 152, 0.6)
  );
  padding: 20px;
}

.userDescription {
  justify-content: center;
}

.userInfo {
}

.header {
  margin-bottom: 20px;
}

:deep(.arco-form-item-label-col) {
  min-width: 80px;
}

:deep(.arco-btn) {
  min-width: 80px;
}
</style>
