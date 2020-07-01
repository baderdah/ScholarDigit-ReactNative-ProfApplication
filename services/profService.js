import { apiUrl } from "../config.json";
import authHttp from "./authService";
import Base64 from "Base64";

const apiEndpoint = apiUrl + "/prof/classes";

const apiLessonsEndpoint = apiUrl + "/prof/modules";

const AbsenceApiEndpoint = apiUrl + "/prof/absence";

export const getStudentsOfTheClasse = async (classeId) => {
  const response = await authHttp.http.get(
    apiEndpoint + "/" + classeId + "/students"
  );
  console.log("GET_Modules : ", response.data);
  return response.data;
};

export const getStudentAbsence = async (studentId) => {
  const response = await authHttp.http.get(
    AbsenceApiEndpoint + "/student/" + studentId
  );
  return response.data;
};

export const getClasses = async () => {
  const response = await authHttp.http.get(apiEndpoint);
  //   console.log("GET_Modules : ", response.data);
  console.log("GET_Modules : ");
  return response.data;
};

export const getLessons = async () => {
  const response = await authHttp.http.get(apiLessonsEndpoint);
  //   console.log("GET_Modules : ", response.data);
  console.log("GET_Lessons : ");
  return response.data;
};

export const getAbsenceFile = async (classeId = 12) => {
  console.log("hello");
  const response = await authHttp.http
    .get(apiEndpoint + "/absence/" + classeId)
    .then((response) => {
      console.log(response.data);
      var b64Data = response.data;
      var contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      var sliceSize = 512;
      var byteCharacters = Base64.atob(b64Data);
      const byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        console.log("hello");

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        console.log("hello");
      }

      const blob = new Blob(byteArrays, { type: contentType });
      var fileSaver = require("file-saver");
      fileSaver.saveAs(blob, "helloworld.xlsx");
    });
};

export const markAbsence = async (absence) => {
  const response = await authHttp.http.post(AbsenceApiEndpoint, absence);
  console.log("Mark absence", response);
  return response;
};

export const getProfilePic = async (imageName) => {
  if (imageName === null || imageName === "") {
    imageName = "Screen%20Shot%202020-03-06%20at%2016.00.36.png";
  }
  console.log("GET_ProfilePic : ", imageName);

  const source = authHttp.http
    .get("http://localhost:8080/scholarity/files/download/" + imageName, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const base64 = Base64.btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      return "data:;base64," + base64;
    });

  console.log("GET_ProfilePic : ", source);
  return source;
};
