<template>
  <div class="searchBar">
    <input class="searchBarInput" placeholder="Search trails" />
    <div class="searchBarButton">
      <div class="searchBarIcon">
        <img class="magGlassImg" src="@/assets/imgs/magGlassDark.svg" alt="search icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style scoped lang="scss">
.searchBar {
  @include flexCenter();
  position: relative;
  width: 90%;
  height: 20px;
  padding: 5px;
  border: medium solid $primaryDark;
  border-radius: 20px;
}
.searchBarInput {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
}
.searchBarIcon {
  position: absolute;
  right: 12px;
  top: 8px;
}
.magGlassImg {
  height: auto;
  width: 1rem;
}
</style>