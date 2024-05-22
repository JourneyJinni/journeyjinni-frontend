import { ref } from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"

import { userConfirm, findById, tokenConfirm, tokenRegeneration, signup, logout, update, signout } from "@/api/user"
import { httpStatusCode } from "@/util/http-status"

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter()

  const isLogin = ref(false)
  const isLoginError = ref(false)
  const userInfo = ref(null)
  const isValidToken = ref(false)
  const username = ref()
  const userId = ref()
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
          console.log("user : ", response.data)
          userInfo.value = response.data.userInfo
          sessionStorage.setItem("accessToken", accessToken)
          sessionStorage.setItem("refreshToken", refreshToken)
          getUserInfo(accessToken)
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
          username.value = userInfo.value.user_name
          userId.value = userInfo.value.user_id
          console.log("username.value : ", response)
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
              router.push({ name: "login" })
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
    // 로그아웃 확인 대화 상자 표시
    const confirmed = confirm("정말 로그아웃 하시겠습니까?");

    if (!confirmed) {
      // 사용자가 로그아웃을 취소했을 때
      console.log("로그아웃이 취소되었습니다.");
      return;
    }

    console.log("로그아웃 아이디 : " + userInfo.value.user_id);
    await logout(
        userInfo.value.user_id,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;

            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            alert("로그아웃 되었습니다.")
          } else {
            console.error("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
    );
  };


  const userSignUp = async (data) => {
    await signup(
        data,
        (response) => {
          if (response.data.success) {
            alert("회원가입이 완료되었습니다.")
            router.push({ name: "home" })
          } else {
            console.log("회원가입 실패")
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
      (response) => {},
      (error) => {
        console.log(error)
      }
    )
  }

  const deleteUser = async (user_id) => {
    await signout(
        user_id,
        (response) => {
          console.log("삭제 완료")
        },
        (error) => {
          console.log("삭제 실패")
        }
    )
  }

  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    username,
    userId,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userSignUp,
    userLogout,
    confirmToken,
    userUpdate,
    deleteUser
  }
} ,  {
  persist: true
}  )
