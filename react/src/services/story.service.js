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

export function GetNearbyStories(lat, long, radius = 7) {
  return axios({
    method: "get",
    url: `/api/stories?Lat=${lat}&Lng=${long}&Radius=${radius}` // future: radius distance?
  });
}

export function GetLatestStories(index = 0, pageSize = 10) {
  return axios({
    method: "get",
    url: `/api/stories/latest?Index=${index}&Size=${pageSize}`
  });
}
