import axios from "axios";

export function CreateStory(payload) {
  return axios({
    method: "post",
    url: "/api/stories",
    data: payload
  });
}
