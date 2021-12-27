import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.inaturalist.org/",
  headers: {
    "Content-Type": "application/json",
  },
});

class INaturalistService {
  getObservations(boundingBox) {
    let coords = boundingBox.coordinates[0];

    let sw = coords[0];
    let ne = coords[2];
    return instance
      .get("observations.json", { params: {
          "swlat" : sw[1],  
          "swlng" : sw[0],
          "nelat" : ne[1],
          "nelng" : ne[0],
          "quality_grade" : "research",
          "per_page": 5,
      }})
      .then((response) => response.data);
  }
}

export default new INaturalistService();