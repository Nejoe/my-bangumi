<script setup lang="ts">
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>
<template>
  <!-- <v-container fluid class="fixed" v-show="alertList.length">
    <v-slide-y-transition :group="true">
      <template v-for="myAlert in alertList" :key="myAlert.timestamp">
        <v-row justify="end"
          ><v-col>
            <v-sheet :rounded="true">
              <v-alert
                id="myAlert"
                v-model="myAlert.show"
                :type="myAlert.type"
                density="compact"
                >{{ myAlert.message }}</v-alert
              >
            </v-sheet></v-col
          ></v-row
        ></template
      ></v-slide-y-transition
    ></v-container
  > -->
  <v-snackbar
    v-model="alert.show"
    :timeout="alert.duration"
    :color="alert.type"
    position="sticky"
  >
    {{ alert.message }}
  </v-snackbar>
</template>
<style scoped>
.fixed {
  position: fixed !important;
  top: 70px;
  left: translate(-50%);
  z-index: 1;
  width: fit-content;
}
#myAlert {
  width: fit-content;
  margin: 0 auto;
}
</style>
