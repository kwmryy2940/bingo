<template>
  <div id="top">
    <!-- 抽選された数字を表示するエリア -->
    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-card
        height="45vh"
        width="45vh"
        class="d-flex justify-center align-center font-weight-bold text-red"
        style="font-size: 216px"
      >
        {{ selectedNumber }}
      </v-card>
    </v-container>

    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-btn
        width="500px"
        color="primary"
        @click="isSelectionStarted = !isSelectionStarted"
        >{{ execButtonText }}</v-btn
      >
    </v-container>

    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-btn
        width="500px"
        color="secondary"
        :disabled="isResetDisable"
        @click="resetSelection"
        >reset</v-btn
      >
    </v-container>

    <!-- 1~75の数字を表示するエリア -->
    <v-sheet v-for="row in 5">
      <v-container fluid fill-height class="d-flex align-center justify-center">
        <v-row>
          <v-col
            v-model="candidateNumbers"
            class="text-center font-weight-bold"
            v-for="col in 15"
          >
            <template
              v-if="
                selectedNumbers.length > 0 &&
                selectedNumbers.includes(col + (row - 1) * 15)
              "
            >
              <div class="text-red bg-gray">
                {{ col + (row - 1) * 15 }}
              </div>
            </template>
            <template v-else>
              {{ col + (row - 1) * 15 }}
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const selectedNumber = ref(null); // 抽選された数字
const selectedNumbers = ref([]); // 抽選された数字群
const candidateNumbers = ref(Array.from({ length: 75 }, (_, i) => i + 1)); // 抽選対象の数字
const isSelectionStarted = ref(false); // 抽選状態を管理する変数
const execButtonText = ref("start"); // 抽選開始・終了ボタンのテキスト
const isResetDisable = ref(false); // リセットボタンの活性を管理する変数

let selectionTimer = null; // 抽選タイマー用変数

// 抽選状態を管理する変数によって処理を切り替える
watch(isSelectionStarted, (val) => {
  // 抽選開始
  if (val) {
    execButtonText.value = "stop";
    isResetDisable.value=true;  // 抽選中はリセットできないようにする
    selectNumbers();
  }
  // 抽選終了
  else {
    execButtonText.value = "start";
    isResetDisable.value=false;
    clearInterval(selectionTimer);

    // 抽選された数字を配列から除外
    removeSelectedNumber();
    // 抽選された数字を抽選済み配列に格納
    selectedNumbers.value.push(selectedNumber.value);
  }
});

// 抽選対象から抽選を行う処理
function selectNumbers() {
  selectionTimer = setInterval(() => {
    let i = Math.floor(Math.random() * candidateNumbers.value.length);
    selectedNumber.value = candidateNumbers.value[i];
  }, 100);
}

// 抽選された数字を抽選対象から除外する処理
function removeSelectedNumber() {
  const index = candidateNumbers.value.indexOf(selectedNumber.value);
  candidateNumbers.value.splice(index, 1);
}

// 抽選をリセットする処理
function resetSelection() {
  selectedNumber.value = null;
  candidateNumbers.value = Array.from({ length: 75 }, (_, i) => i + 1);
  selectedNumbers.value = [];
}

onMounted(() => {});
</script>

<style scoped>
.relative {
  position: relative;
}

.overlay-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
