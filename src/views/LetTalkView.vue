<template>
  <div id="letTalkView">
    <a-comment author="BLR" align="right">
      <template #content>
        <a-card class="content-spacer">
          依山傍水房数间，行也安然，坐也安然。
          一头耕牛半顷田，收也凭天，荒也凭天。<br />
          雨过天晴驾小船，鱼在一边，酒在一边。
          路逢骚客问诗篇，好也几言，歹也几言。<br />
          布衣得暖胜丝棉，新也可穿，旧也可穿。
          粗茶淡饭饱三餐，早也香甜，晚也香甜。<br />
          夜归妻子话灯前，今也谈谈，古也谈谈。
          一觉睡到日三竿，不是神仙，胜似神仙！<br />
          ——— 若森.《不良人》
        </a-card>
        <!-- 时间显示区域 -->
        <div class="time-container">
          <span class="publish-time">发布时间：{{ publishTime }}</span>
          <span class="current-time">当前时间：{{ currentTime }}</span>
        </div>
      </template>
      <template #avatar>
        <a-avatar>
          <img alt="avatar" src="@/assets/avatar/ava03.jpg" />
        </a-avatar>
      </template>
    </a-comment>
    <a-comment author="BLR" align="right">
      <template #content>
        <a-card class="content-spacer">
          事间万事，风云变幻，苍黄翻覆。纵使波谲云诡，但制心一处，便无事不办。天定胜人，人，定兮胜天。天下尽做饵，唯本帅执杆。
          三百年光阴，京师长安全到东都洛阳兴亡起伏，从鼓动杨广大兴师旅到造就贞观之治，渭水之盟到大败突厥，废王立武到二圣临朝，谋天宝之乱到纵黄巢反警示僖宗。<br />
          臣，无不是为大唐，这其中多少苦心，多少苦难，本帅始终不曾停下脚步，乱世数十载以至当下之事。
          前有朱贼父子篡权，中有沙陀李鸦儿，岐地宋文通野心颇大，现有门外诸侯权贵，暗流汹涌。
          尤其那李嗣源更甚，我大唐世道，何时竟成了如此模样。<br />
          一直以来，本帅才是那个执棋者，才是那个造局人。
          玄宗当年是何等雄武之才，开元之际，励精政事，遂袭大统，几至太平，何其盛也！
          明孝皇帝本应是我大唐江山万年之主，却因沉迷一个女人，晏安耽毒，府卫崩坏，穷尽天下之欲而不足其乐。<br />
          自此，我大唐不复存矣。高祖，太宗，高宗，玄宗，代，德，顺，武，宣，懿，僖，昭，诸君，臣，尽力了！<br />
          ——— 袁天罡
        </a-card>
        <!-- 时间显示区域 -->
        <div class="time-container">
          <span class="publish-time">发布时间：2025/03/22 10:11</span>
          <span class="current-time">当前时间：{{ currentTime }}</span>
        </div>
      </template>
      <template #avatar>
        <a-avatar>
          <img alt="avatar" src="@/assets/avatar/ava03.jpg" />
        </a-avatar>
      </template>
    </a-comment>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

// 发布时间（静态时间，可硬编码或从接口获取）
const publishTime = ref("2025-03-21 22:56");

// 实时时间逻辑保持不变
const currentTime = ref("");
let timer: number;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000) as unknown as number;
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
#letTalkView {
  max-width: 750px;
  margin: 0 auto;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.content-spacer {
  background: #9bcbc0;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 16px;
}

/* 时间容器样式 */
.time-container {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  color: #0e0e0e;
}

/* 发布时间样式 */
.publish-time {
  font-weight: 500;
}

/* 实时时间样式 */
.current-time {
  font-weight: 500;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
