import { ref } from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"

import { userConfirm, findById, tokenConfirm, tokenRegeneration, logout, update } from "@/api/user"
import { httpStatusCode } from "@/util/http-status"

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter()

  const isLogin = ref(false)
  const isLoginError = ref(false)
  const userInfo = ref(null)
  const isValidToken = ref(false)

  const userLogin = async (loginUser) => {
    await userConfirm(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          console.log("로그인 성공!!!!")
          let { data } = response
          let accessToken = data["access-token"]
          let refreshToken = data["refresh-token"]
          isLogin.value = true
          isLoginError.value = false
          isValidToken.value = true
          userInfo.value = response.data.userInfo
          sessionStorage.setItem("accessToken", accessToken)
          sessionStorage.setItem("refreshToken", refreshToken)
        }
      },
      (error) => {
        console.log("로그인 실패!!!!")
        isLogin.value = false
        isLoginError.value = true
        isValidToken.value = false
        console.error(error)
      }
    )
  }

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token)
    console.log("getUserInfo에 들어옴" , decodeToken)
    await findById(
      decodeToken.userId,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          userInfo.value = response.data.userInfo
          isValidToken.value = true
        } else {
          isValidToken.value = false
          console.log("유저 정보 없음!!!!")
        }
      },
      async (error) => {
        console.error(
          "getUserInfo[토큰 만료되어 사용 불가능.] : ",
          error.response.status,
          error.response.statusText
        )
        isValidToken.value = false

        await tokenRegenerate(sessionStorage.getItem("refreshToken"))
      }
    )
  }

  const confirmToken = async () => {
    console.log("confirmToken에 들어옴...")
    await tokenConfirm(
      (response) => {
        if (response.status === 202) {
          console.log("올바른 토큰!")
          userInfo.value = response.data.userInfo
          isValidToken.value = true
        } else {
          console.log("유저 정보 없음!!!!")
        }
      },
      async (error) => {
        console.log("잘못된 토큰!")
        console.error(
          "confirmToken[토큰 만료되어 사용 불가능.] : ",
          error.response.status,
          error.response.statusText
        )
        isValidToken.value = false

        await tokenRegenerate(sessionStorage.getItem("refreshToken"))
      }
    )
  }

  const tokenRegenerate = async (refreshToken) => {
    let decodeToken = jwtDecode(refreshToken)
    console.log("토큰을 재생성! " , decodeToken.userId)
    await tokenRegeneration(
      decodeToken.userId,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let accessToken = response.data["access-token"]
          userInfo.value = response.data.userInfo
          sessionStorage.setItem("accessToken", accessToken)
          isValidToken.value = true
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === httpStatusCode.UNAUTHORIZED) {
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            userInfo.value.userid,
            (response) => {
              if (response.status === httpStatusCode.OK) {
                console.log("리프레시 토큰 제거 성공")
              } else {
                console.log("리프레시 토큰 제거 실패")
              }
              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.")
              isLogin.value = false
              userInfo.value = null
              isValidToken.value = false
              router.push({ name: "user-login" })
            },
            (error) => {
              console.error(error)
              isLogin.value = false
              userInfo.value = null
            }
          )
        }
      }
    )
  }

  const userLogout = async () => {
    console.log("로그아웃 아이디 : " + userInfo.value.user_id)
    await logout(
      userInfo.value.user_id,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          isLogin.value = false
          userInfo.value = null
          isValidToken.value = false

          sessionStorage.removeItem("accessToken")
          sessionStorage.removeItem("refreshToken")
        } else {
          console.error("유저 정보 없음!!!!")
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const userUpdate = async (data) => {
    console.log("업데이트!");
    await update(
      data,
      (response) => {
      },
      (error) => {
        console.log(error)
      }
    )
  }



  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userLogout,
    confirmToken,
    userUpdate,
  }
})
