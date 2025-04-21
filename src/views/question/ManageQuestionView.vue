<template>
  <div id="manageQuestionView">
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
      <template #optional="{ record }">
        <a-space class="updateButton">
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
        </a-space>
        <a-space>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #submitNum="{ record }">
        <a-space class="updateButton">
          {{ record.submitNum }}
        </a-space>
      </template>
      <template #acceptedNum="{ record }">
        <a-space class="updateButton">
          <a-space
            v-if="record.submitNum > record.acceptedNum / 2 + 1"
            style="color: red"
            bordered
          >
            {{ record.acceptedNum }}
          </a-space>
          <a-space v-else color="red">{{ record.acceptedNum }}</a-space>
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <!-- 添加 v-if 确保遍历的是数组 -->
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            size="middle"
            :color="getTagStyleColor(tag)"
          >
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records.map((item: any) => ({
      ...item,
      tags: JSON.parse(item?.tags),
    }));
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

// 修改后的代码
type TagColor = {
  text: string;
  color: string;
};

type TagsObj = {
  简单: TagColor;
  中等: TagColor;
  困难: TagColor;
};

// 移除默认颜色配置
const tagsObjtList: TagsObj = {
  简单: { text: "简单", color: "#0fc6c2" },
  中等: { text: "中等", color: "#ffb400" },
  困难: { text: "困难", color: "#f53f3f" },
};

// 颜色缓存（保持相同标签颜色一致）
const colorCache = new Map<string, string>();

// 生成随机颜色函数
const generateRandomColor = (): string => {
  // 生成明亮色系（避免太暗的颜色）
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 50 + Math.floor(Math.random() * 20);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // 或者使用十六进制方案
  // return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
};

// 修改后的颜色获取函数
const getTagStyleColor = (tag: string): string => {
  // 处理空值
  if (!tag?.trim()) return "#f0f0f0";

  // 优先匹配预设标签
  if (tag in tagsObjtList) {
    return tagsObjtList[tag as keyof TagsObj].color;
  }

  // 缓存处理
  if (!colorCache.has(tag)) {
    colorCache.set(tag, generateRandomColor());
  }

  return colorCache.get(tag)!;
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题目ID",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "提交数",
    slotName: "submitNum",
  },
  {
    title: "通过数",
    slotName: "acceptedNum",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: ({ record }: { record: any }) => {
      // 处理空值情况
      if (!record.updateTime) return h("span", "-");

      // 格式化为 YYYY-MM-DD
      return h("span", dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss"));
    },
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}

.updateButton {
  margin-bottom: 5px;
}
</style>
