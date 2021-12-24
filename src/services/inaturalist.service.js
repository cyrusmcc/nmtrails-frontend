import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.inaturalist.org/",
  headers: {
    "Content-Type": "application/json",
  },
});

class INaturalistService {
  getObservations() {
    return instance
        .get("observations.json", { params: {
            "quality_grade" : "research"
        }})
        .then((response) => response.data);
  }
/*
  getObservations(boundingBox) {
    let coords = boundingBox.coords;
    let sw = coords[0];
    let ne = coords[2];
      return instance
        .get("observations.json", { params: {
            "swlat" : sw[1],
            "swlng" : sw[0],
            "nelat" : ne[1],
            "nelng" : ne[0],
            "quality_grade" : "research"
        }})
        .then((response) => response.data);
  }
  */
}

export default new INaturalistService();