<template>
  <div id="addQuestionView">
    <h2 style="margin-left: 10px">创建题目</h2>
    <a-form
      :model="form"
      label-align="right"
      style="margin-left: 10px; font-weight: bold"
    >
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.title"
          style="width: 650px"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          style="width: 650px"
          placeholder="请选择标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              :min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              :min="0"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <div class="judge-case-container">
        <div
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          class="case-item"
        >
          <a-form-item
            label="测试用例配置"
            :content-flex="false"
            :merge-props="false"
          >
            <a-space direction="vertical" style="min-width: 480px">
              <a-form-item
                :field="`form.judgeCase[${index}].input`"
                :label="`输入用例${index}`"
                :key="index"
              >
                <a-textarea
                  v-model="judgeCaseItem.input"
                  placeholder="请输入测试输入用例"
                />
              </a-form-item>
              <a-form-item
                :field="`form.judgeCase[${index}].output`"
                :label="`输出用例${index}`"
                :key="index"
              >
                <a-textarea
                  v-model="judgeCaseItem.output"
                  placeholder="请输入测试输出用例"
                />
              </a-form-item>
              <a-button
                @click="handleDelete(index)"
                type="dashed"
                status="danger"
              >
                Delete Example
              </a-button>
            </a-space>
            <div style="margin-top: 20px">
              <a-button @click="handleAdd" type="dashed" status="success"
                >Add New Example
              </a-button>
            </div>
          </a-form-item>
        </div>
      </div>

      <div style="margin-top: 20px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 125px" @click="doSubmit"
          >Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
// 如果页面地址包含 update，是为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  tags: [],
  title: "",
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    // stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目 id 获取老的数据
 */
const loadDate = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象

    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        // stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败：" + res.message);
  }
};

onMounted(() => {
  loadDate();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败" + res.message);
    }
  }
};

/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除测试用例
 * @param index
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#addQuestionView {
  min-width: 100%;
  background-color: rgba(155, 203, 192, 0.5);
}

:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}

.judge-case-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.case-item {
  padding: 12px;
  border-radius: 4px;
}
</style>
