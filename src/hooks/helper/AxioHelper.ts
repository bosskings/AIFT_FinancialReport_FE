import axios from "axios";

export const post_requests = async (url: string, data: any, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.post(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    data,
    { headers }
  );
  return response;
};


export const post_request_blob = async (url: string, data: any, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.post(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    data,
    { headers, responseType: 'blob' } // ← this is the key fix
  );
  return response;
};


export const post_request_with_image = async (
  url: string,
  data: any,
  token = ""
) => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.post(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    data,
    { headers: { ...headers, "Content-Type": "multipart/form-data" } }
  );
  return response;
};

export const get_requests = async (url: string, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.get(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    { headers }
  );
  return response;
};

export const delete_requests = async (url: string, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.delete(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    { headers }
  );
  return response;
};

export const put_requests = async (url: string, data: any, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.put(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    data,
    { headers }
  );
  return response;
};

export const put_request_with_image = async (url: string, data: FormData, token = "") => {
  const headers: any = {
    "Content-Type": "multipart/form-data",
  }

  if (token !== "") {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await axios.put(`${'https://aift-financialreport.onrender.com/api/v1/'}${url}`, data, { headers })
  return response
}

export const patch_requests = async (url: string, data: any, token = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.patch(
    `${'https://aift-financialreport.onrender.com/api/v1/'}${url}`,
    data,
    { headers }
  );
  return response;
};
