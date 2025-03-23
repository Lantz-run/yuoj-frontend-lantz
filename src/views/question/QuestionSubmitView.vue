<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="questionId"
        label="QuestionId"
        style="min-width: 240px"
      >
        <a-input :v-model="searchParams.questionId" placeholder="请输入题号" />
      </a-form-item>
      <a-form-item field="title" label="Language" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">Search</a-button>
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
      <template #message="{ record }">
        <a-tag
          v-if="record.judgeInfo.message === 'Accepted'"
          color="green"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Wrong Answer'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Presentation Error'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Time Limit Exceeded'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Memory Limit Exceeded'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Runtime Error'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Output Limit Exceeded'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Compile Error'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Waiting'"
          color="blue"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'Dangerous Operation'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag
          v-if="record.judgeInfo.message === 'System Error'"
          color="red"
          bordered
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag v-if="record.judgeInfo.message === null" color="gray" bordered>
          {{ record.judgeInfo.message === "" }}
        </a-tag>
      </template>
      <template #time="{ record }">
        {{ record.judgeInfo.time ? record.judgeInfo.time + " ms" : "N/A" }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status === 'Succeed'" color="green" bordered>
          {{ record.status }}
        </a-tag>
        <a-tag v-if="record.status === 'Waiting'" color="orange" bordered>
          {{ record.status }}
        </a-tag>
        <a-tag v-if="record.status === 'Running'" color="blue" bordered>
          {{ record.status }}
        </a-tag>
        <a-tag v-if="record.status === 'Failed'" color="red" bordered>
          {{ record.status }}
        </a-tag>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 15,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
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
    title: "SubmitId",
    dataIndex: "id",
  },
  {
    title: "Language",
    dataIndex: "language",
  },
  {
    title: "Result",
    slotName: "message",
  },
  {
    title: "Time",
    slotName: "time",
  },
  {
    title: "Status",
    slotName: "status",
  },
  {
    title: "QuestionId",
    dataIndex: "questionId",
  },
  {
    title: "UserId",
    dataIndex: "userId",
  },
  {
    title: "CreateTime",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
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
</script>

<style scoped>
#questionsView {
  max-width: 1400px;
  margin: 0 auto;
}

.arco-form-item-label {
  color: #000 !important;
}
</style>
