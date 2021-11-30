<template>
  <div class="listContainer">
    <ol class="trailList">
      <li v-for="(trail, index) in trailArr" :key="index">
        <div class="trailImgContainer">
          <img src="@/assets/imgs/hiking.jpg" class="trailImg" alt="" />
          <!--
          <img
            class="trailImg"
            :src="getImgFromTrailId(index, trail.id)"
            alt="trail image"
            onload="this.style.display='block'"
          />
          -->
        </div>
        <div class="trailInfoContainer">
          <div class="trailTitle">
            <router-link :to="'/t/' + trail.id">{{
              trail.title
            }}</router-link>
          </div>
          <ol class="trailTagList">
            <li v-for="(tag, index) in trail.tags" :key="index">
              <div class="trailTag">{{ tag.value }}</div>
            </li>
          </ol>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "TrailList",
  components: {},
  data() {
    return {
      trailArr: [
        {
          name: "Trail 1",
          id: 1,
          tags: [{ value: "tag1" }, { value: "tag2" }],
        },
        {
          name: "Trail 2",
          id: 2,
          tags: [{ value: "tag1" }, { value: "tag2" }],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.trailList {
  width: 100%;
  margin-top: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#trailList > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  margin-bottom: 10px;
  height: 150px;
  width: 95%;
  box-shadow: $shadowLight;
}
.trailImgContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 150px;
}
.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
}
.trailInfoContainer {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.trailTagList {
  width: 95%;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  column-gap: 5px;
}
#trailTagList > li {
  list-style-type: none;
}
.trailTag {
  height: fit-content;
  width: fit-content;
  background-color: lightblue;
  padding: 3px;
  font-size: 0.8rem;
  border-radius: 8px;
  margin-top: 10px;
}
.trailTitle {
  text-align: center;
  font-style: italic;
  color: $primaryLight;
  font-style: italic;
}
</style>