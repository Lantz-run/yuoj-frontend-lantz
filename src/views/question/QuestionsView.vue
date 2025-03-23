<template>
  <div class="main-container">
    <div id="questionsView" style="width: 80%; margin-left: 10px">
      <a-form :model="searchParams" layout="inline">
        <a-form-item
          field="title"
          label="QuestionTitle"
          style="min-width: 240px"
        >
          <a-input v-model="searchParams.title" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item field="tags" label="Tags" style="min-width: 240px">
          <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doSubmit">提交</a-button>
        </a-form-item>
      </a-form>
      <a-divider :size="0" />
      <a-table
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
        }"
        @page-change="onPageChange"
      >
        <template #tags="{ record }">
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              size="large"
              :color="getTagStyleColor(tag)"
              >{{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #acceptedRate="{ record }">
          {{
            record.submitNum
              ? `${((record.acceptedNum / record.submitNum) * 100).toFixed(
                  2
                )}% (${record.acceptedNum}/${record.submitNum})`
              : "0.00% (0/0)"
          }}
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="toQuestionPage(record)"
              >做题
            </a-button>
          </a-space>
        </template>
      </a-table>
    </div>
    <div id="CalendarView" class="sider">
      <a-layout-sider style="width: 100%">
        <!-- 这里放置你的日历组件 -->
        <a-date-picker
          v-model:model-value="currentDate"
          :default-value="currentDate"
          hide-trigger
          style="width: 268px"
          format="YYYY-MM-DD"
        />
      </a-layout-sider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

const show = ref(true);
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 15,
  current: 1,
});

// 定义对象类型
type TagsObj = {
  default: { text: string; color: string };
  简单: { text: string; color: string };
  中等: { text: string; color: string };
  困难: { text: string; color: string };
};

const tagsObjtList: TagsObj = {
  default: { text: "默认", color: "#62bd75" },
  简单: { text: "简单", color: "#0fc6c2" },
  中等: { text: "中等", color: "#ffb400" },
  困难: { text: "困难", color: "#f53f3f" },
};

// 使用类型守卫的解决方案
const getTagStyleColor = (tag: string) => {
  if (!tag || !(tag in tagsObjtList)) {
    return tagsObjtList.default.color;
  }
  return tagsObjtList[tag as keyof TagsObj].color; // 安全访问
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "QuestionId",
    dataIndex: "id",
  },
  {
    title: "QuestionTitle",
    dataIndex: "title",
  },
  {
    title: "Tags",
    slotName: "tags",
  },
  {
    title: "AcceptedRate",
    slotName: "acceptedRate",
  },
  {
    title: "CreateTime",
    slotName: "createTime",
  },

  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认提交前，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/*日历*/
const currentDate = ref(dayjs().format("YYYY-MM-DD"));

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

onMounted(() => {
  // 每天凌晨自动更新
  timer = setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      currentDate.value = dayjs().format("YYYY-MM-DD");
    }
  }, 60 * 10000); // 每小时检查一次
});
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}

/* 外层容器布局 */
.main-container {
  display: flex;
  gap: 10px; /* 控制左右间距 */
}

.arco-form-item-label-col > .arco-form-item-label {
  color: #000000;
}

/* 左侧内容区域 */
.content {
  flex: 1; /* 占据剩余空间 */
  min-width: 0; /* 防止内容溢出 */
}

/* 右侧侧边栏 */
.sider {
  width: 18%; /* 固定宽度 */
  background: linear-gradient(60deg, #9bcbc0, #729fd4);
  padding: 2px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .sider {
    width: 100%;
    order: -1; /* 移动端时侧边栏显示在上方 */
  }
}
</style>
