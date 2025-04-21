<template>
  <div id="userManage" class="user-list">
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
      <template #userAvatar="{ record }">
        <img
          :src="record.userAvatar"
          style="width: 40px; height: 40px; border-radius: 4px"
        />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref, watchEffect } from "vue";
import { User, UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { Avatar } from "@arco-design/web-vue";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
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
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "用户账户",
    dataIndex: "userAccount",
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "用户头像",
    dataIndex: "userAvatar",
    slotName: "userAvatar",
  },
  {
    title: "用户简介",
    dataIndex: "userProfile",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "用户邮箱",
    dataIndex: "userEmail",
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
    title: "更新时间",
    dataIndex: "updateTime",
    render: ({ record }: { record: any }) => {
      // 处理空值情况
      if (!record.updateTime) return h("span", "-");

      // 格式化为 YYYY-MM-DD
      return h("span", dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss"));
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

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (user: User) => {
  router.push({
    path: "/update/message",
    query: {
      id: user.id,
    },
  });
};
</script>

<style scoped>
#userManage {
}

.updateButton {
  margin-bottom: 5px;
}
</style>
