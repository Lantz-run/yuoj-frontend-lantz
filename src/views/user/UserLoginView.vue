<template>
  <div id="userLoginView">
    <h2 style="margin-top: 80px; margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 350px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" tooltip="请输入您的账号" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userEmail" tooltip="请输入您的邮箱" label="邮箱">
        <a-input v-model="form.userEmail" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="请输入不少于8位的密码"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item style="display: flex">
        <a-button type="primary" style="width: 130px" html-type="submit"
          >登录
        </a-button>
      </a-form-item>
      <a-form-item>
        <router-link to="/user/register" style="margin-left: 0">
          还没有账号？注册新用户
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<style>
/* 居中按钮 */
#userLoginView .arco-form-item-content-flex {
  display: flex;
  align-items: center;
  justify-content: left;
}

/*去除ie edge的密码框默认的快速清除钮（X图标）以及密码文字显示钮*/
input[type="password"]::-ms-reveal {
  display: none;
}

input[type="password"]::-ms-clear {
  display: none;
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import {
  OpenAPI,
  UserControllerService,
  UserLoginRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userEmail: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单
 */
const handleSubmit = async (data: any) => {
  console.log(data);
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登陆成功，跳转到主页
  if (res.code === 0) {
    window.localStorage.setItem("myToken", res.data.token);
    OpenAPI.TOKEN = async () => {
      const { token } = res.data;
      return token;
    };
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};
</script>
