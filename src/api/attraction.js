import { localAxios } from "@/util/http-commons";

const local = localAxios();

function cityInfo(success, fail) {
  local.get(`/getCity`).then(success).catch(fail);
}

function categoryInfo(success, fail) {
  local.get(`/getCategory`).then(success).catch(fail);
}

function getAttractionListByFilter(props, success, fail) {
  return local.post("/filterlist", props).then(success).catch(fail);
}

// 위치를 기반으로 리스트를 반환한다.
function getLocationList(coordinate, success, fail) {
  local.post("/nowLocation", coordinate).then(success).catch(fail);
}

export {
  cityInfo,
  categoryInfo,
  getAttractionListByFilter,
  getLocationList
};
