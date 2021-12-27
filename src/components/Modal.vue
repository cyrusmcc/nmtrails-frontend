<template>
  <div class="modalBackground" @mousedown.self.prevent="closeModal">
    <div class="card" id="modalContent">
      <div id="modalClose" @click.prevent="closeModal">+</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
#modalContent {
  position: relative;
  margin: 150px auto;
  z-index: inherit;
  color: $primaryDark;
  background-color: $primaryLight;
  border-radius: 4px;
  text-align: center;
  position: relative;
  padding: 40px 10px 10px 10px;
  max-width: 80%;
}
#modalClose {
  position: absolute;
  z-index: inherit;
  color: $primaryDark;
  user-select: none;
  top: 0;
  left: 10px;
  font-size: 2em;
  transform: rotate(45deg);
  cursor: pointer;
}
</style>