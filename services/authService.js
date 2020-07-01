import { AsyncStorage } from "react-native";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import axios from "axios";

const apiEndpoint = apiUrl + "/authenticate";
const tokenKey = "token";

console.log("We are here");

setJwt(getJwt());

axios.interceptors.response.use(null, error => {
  console.log("interceptors");

  const jwtExpiredError = error.response && error.response.status >= 401;
  if (jwtExpiredError) {
    removeItem(tokenKey);
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // toast.error("An unexpected error occured.");
    console.log("interceptorsss", error.response);
  }
  return Promise.reject(error);
});

async function setJwt(jwt) {
  jwt = await jwt;
  console.log("JWT", jwt);
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
  }
}

async function setVar(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("error saving data", error);
  }
}
async function getVar(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return await value;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error retrieving data", error);
  }
}
async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("error deleting data", error);
  }
}
async function login(userName, password) {
  console.log("login");

  const { data: jwt } = await http.post(apiEndpoint, {
    userName,
    password
  });
  const user = jwtDecode(jwt.jwt);

  console.log(user);
  if (user.roles.filter(role => role.authority === "Prof").length === 0) {
    throw new Error("forbidden");
    return;
  }

  setVar(tokenKey, jwt.jwt);
  setJwt(getJwt());
}
function loginWithJwt(jwt) {
  setVar(tokenKey, jwt);
}

function getJwt() {
  return getVar(tokenKey);
}

function logout() {
  removeItem(tokenKey);
}
async function getCurrentUser() {
  try {
    const jwt = await getVar(tokenKey);
    console.log("GETCurrentUser JWT : ", jwt);
    const user = jwtDecode(jwt);
    console.log("GETCurrentUser User : ", user);
    return user;
  } catch (error) {}
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};

export default authHttp = {
  http,
  auth
};
