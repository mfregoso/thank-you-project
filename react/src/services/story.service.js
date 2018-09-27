import axios from "axios";

export function CreateStory(payload) {
  return axios({
    method: "post",
    url: "/api/stories",
    data: payload
  });
}

export function GetStoryById(id) {
  return axios({
    method: "get",
    url: "/api/stories/" + id
  });
}
