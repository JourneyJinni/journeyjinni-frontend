import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getTrip(success, fail) {
    local.get(`/tripboard/getTrip`).then(success).catch(fail);
}


export {
    getTrip
};
