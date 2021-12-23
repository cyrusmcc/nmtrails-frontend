const trailArr = [];

export const trail = {
  namespaced: true,
  state: trailArr,
  actions: {},
  getters: {
    getTrails: (state) => {
      return state.trailArr;
    },
    getTrailById: (state) => (id) => {
      if (trailArr.length == 0) return null;
      else return state.trailArr.find((trail) => trail.id == id);
    }
  }
};