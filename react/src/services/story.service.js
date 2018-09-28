import axios from "axios";

export function CreateStory(payload) {
  return axios({
    method: "post",
    url: "/api/stories",
    data: payload
  });
}

export function UpdateStory(id, payload) {
  return axios({
    method: "put",
    url: "/api/stories/" + id,
    data: payload
  });
}

export function DeleteStory(id) {
  return axios({
    method: "delete",
    url: "/api/stories/" + id
  });
}

export function GetStoryById(id) {
  return axios({
    method: "get",
    url: "/api/stories/" + id
  });
}

export function GetAllStories() {
  return axios({
    method: "get",
    url: "/api/stories"
  });
}

export function GetNearbyStories(lat, long, distance) {
  return axios({
    method: "get",
    url: `/api/stories?lat=${lat}&long=${long}` // future: radius distance?
  });
}
