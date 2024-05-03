<template>
  <div id="top">
    <!-- 抽選された数字を表示するエリア -->
    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-card
        height="45vh"
        width="45vh"
        class="d-flex justify-center align-center"
      >
        Selected number
      </v-card>
    </v-container>

    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-btn width="500px" color="primary">start</v-btn>
    </v-container>

    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-btn width="500px" color="secondary">reset</v-btn>
    </v-container>

    <!-- 1~75の数字を表示するエリア -->
    <v-sheet v-for="row in 5">
      <v-container fluid fill-height class="d-flex align-center justify-center">
        <v-row>
          <v-col class="text-center" v-for="col in 15">
            {{ col + (row - 1) * 15 }}
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
