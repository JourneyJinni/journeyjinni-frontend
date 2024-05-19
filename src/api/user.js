import { localAxios } from "@/util/http-commons";
import axios from "axios";

const local = localAxios();

// 유저 확인
async function userConfirm(param, success, fail) {
  await local.post(`/user/login`, param).then(success).catch(fail);
}

// 아이디 찾기 
async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenConfirm(success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/user/token_confirm`).then(success).catch(fail);
}

// 토큰 등록
async function tokenRegeneration(userid, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); 
  await local.post(`/user/refresh/${userid}`).then(success).catch(fail);
}

// 로그아웃
async function logout(user_id, success, fail) {
  await local.get(`/user/logout/${user_id}`).then(success).catch(fail);
}

async function signup(data, success, fail) {
  console.log("data = ", data);
  await local.post(`/user/signup`, data).then(success).catch(fail);
}

async function update(data, success, fail) {
  console.log("data = ", data);
  await local.post(`/user/update`, data).then(success).catch(fail);
}

async function checkId(userid, success){
  await local.post('/user/checkUserId', { userid: userid }).then(success);
}

async function signout(userid, success){
  await local.get(`/user/delete/${userid}`).then(success);
}

export { userConfirm, findById, tokenConfirm, tokenRegeneration, logout, signup, update, checkId, signout };
