import {ref, watch} from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"

import { httpStatusCode } from "@/util/http-status"

export const useAttractionStore = defineStore("memberStore", () => {

    let searchedList = ref([])

    let coordinateData = ref({
    });


    return {
        searchedList,
        coordinateData
    }
} ,  {
    persist: true
}  )
