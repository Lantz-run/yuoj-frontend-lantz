import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "/src/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionsView from "@/views/question/ViewQuestionsView.vue";
import AboutView from "@/views/AboutView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import BasicLayouts from "@/layouts/BasicLayouts.vue";
import UpdateUserInfoView from "@/views/user/UpdateUserInfoView.vue";
import LetTalkView from "@/views/LetTalkView.vue";
import UserLogoutView from "@/views/user/UserLogoutView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionSubmitView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/Info",
    name: "用户信息",
    component: UserInfoView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/update/message",
    name: "更新用户信息",
    component: UpdateUserInfoView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/letTalk",
    name: "说说",
    component: LetTalkView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: false,
    },
  },
  // {
  //   path: "/noAuth",
  //   name: "无权限",
  //   component: NoAuthView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/about",
    name: "关于本项目",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
];
