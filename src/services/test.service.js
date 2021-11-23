import api from "./http-commons";

const TEST_URL = "/test";

class TestService {
  getTest() {
    return api.get(TEST_URL + "/hi");
  }
}

export default new TestService();