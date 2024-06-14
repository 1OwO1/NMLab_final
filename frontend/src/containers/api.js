import axios from "axios";
class api {
  static async registerFace(name, url) {
    var formData = new FormData();
    formData.append("username", name);
    formData.append("jpg", url);
    return await postImage(`/frontendrequestreg`, formData).then((res) => res);
  }

  static waitProcess() {
    return getInfo(`/frontendcheckreg`).then((res) => res);
  }

  static async loginFace(url) {
    var formData = new FormData();
    formData.append("jpg", url);
    let log = await postImage(`/frontendrequestlog`, formData).then((res) => res);
    return log;
    // waiting: true => detect face success
    // waiting: false => detect face error
  }

  static waitLoginProcess() {
    return getInfo(`/frontendchecklog`).then((res) => res);
  }
  // req: jpg:face image, pdf: filename
  // res: waiting:true
  // post
  static askPDF(url, fileName) {
    var formData = new FormData();
    formData.append("jpg", url);
    formData.append("pdf", fileName);
    return postImage(`/pdfrequest`, formData).then((res) => res);
  }

  // get
  // done:true, access:true(you are the author), file:file base64 url
  static getPDF() {
    return getInfo(`/pdfrequest`).then((res) => res);
  }
}

/**
  * 
  
  * @param {FormData} formData 
  * @returns 
  */
let postImage = (endpoint, formData) => {
  const customHeader = {
    headers: {
      // Authorization: `Bearer ${getLocalStorageToken()}`,
      "Content-Type": "multipart/form-data",
    },
  };
  // change to your server ip
  let url = `http://172.20.10.3:8080${endpoint}`;
  return axios
    .post(url, formData, customHeader)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        error: null,
      };
    })
    .catch((err) => {
      return {
        status: err.response ? err.response.status : 0,
        data: {},
        error: err.message,
      };
    });
};

let getInfo = (endpoint) => {
  const customHeader = {
    headers: {
      // Authorization: `Bearer ${getLocalStorageToken()}`,
      "Content-Type": "multipart/form-data",
    },
  };
  // change to your server ip
  let url = `http://172.20.10.3:8080${endpoint}`;
  return axios
    .get(url, customHeader)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        error: null,
      };
    })
    .catch((err) => {
      return {
        status: err.response ? err.response.status : 0,
        data: {},
        error: err.message,
      };
    });
};

export { api };
