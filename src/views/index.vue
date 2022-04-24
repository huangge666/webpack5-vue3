<template>
  <div class="index">
    {{title}}
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "index",

  setup() {
    const state = reactive({
      title: "上元盛景",
    });

    onMounted(() => {
      console.log("mounted!");
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.index {
  background-image: url("~images/index/bg.png");
  width: 100%;
  height: 100%;
}
</style>