<template>
  <div id="userRegisterView">
    <h2 style="margin-top: 80px; margin-bottom: 16px">用户注册</h2>
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
      <a-form-item
        field="checkPassword"
        tooltip="请输入不少于8位的密码"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="再次确认密码"
        />
      </a-form-item>
      <a-form-item field="userName" tooltip="请输入你的昵称" label="账号昵称">
        <a-input v-model="form.userName" placeholder="请输入账号昵称" />
      </a-form-item>
      <a-form-item style="display: flex">
        <a-button type="primary" style="width: 130px" html-type="submit"
          >注册
        </a-button>
      </a-form-item>
      <a-form-item>
        <router-link to="/user/login" style="margin-left: 0">
          已有账号？登录用户
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<style>
/* 居中按钮 */
#userRegisterView .arco-form-item-content-flex {
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
import { UserControllerService, UserRegisterRequest } from "../../../generated";
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
  checkPassword: "",
  userName: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登陆成功，跳转到主页
  if (res.code === 0 && form.userPassword === form.checkPassword) {
    await store.dispatch("user/getLoginUser");
    message.success("注册成功！");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
