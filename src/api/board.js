import { localAxios } from "@/util/http-commons";

const local = localAxios();

function cityInfo(success, fail) {
  local.get(`/getCity`).then(success).catch(fail);
}

function categoryInfo(success, fail) {
  local.get(`/getCategory`).then(success).catch(fail);
}


export {
  cityInfo,
  categoryInfo,
};
