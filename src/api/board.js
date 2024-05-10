import { localAxios } from "@/util/http-commons";

const local = localAxios();

function cityInfo(param, success, fail) {
  local.get(`/attraction`, { params: param }).then(success).catch(fail);
}

export {
  cityInfo,

};
