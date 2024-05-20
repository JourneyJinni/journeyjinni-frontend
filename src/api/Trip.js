import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getTrip(success, fail) {
    local.get(`/tripboard/getTrip`).then(success).catch(fail);
}

function getTripDetails(tripId, success,fail) {
     local.get(`/tripboard/getTripDetail/${tripId}`).then(success).catch(fail);
}

function getAttractionImages(attractionId, success, fail){
     local.get(`/tripboard/getTripImage/${attractionId}`).then(success).catch(fail);
}

export {
    getTrip,getTripDetails,getAttractionImages
};
