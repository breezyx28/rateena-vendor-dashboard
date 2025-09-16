import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import config from "../config";

const { api } = config;

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const authUser: any = sessionStorage.getItem("authUser");
const token = JSON.parse(authUser) ? JSON.parse(authUser).accessToken : null;
if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// Language header
const getCurrentLanguage = () => {
  const currentLang = localStorage.getItem("I18N_LANGUAGE") || "en";
  return currentLang === "ar" ? "ar" : "en";
};

// Set language header
axios.defaults.headers.common["Accept-Language"] = getCurrentLanguage();

// Image URL
export const imgURL = process.env.REACT_APP_IMAGES_ENDPOINT;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response?.data ? response?.data : response;
  },
  function (error) {
    console.log("api-handler-error: ", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error?.response?.status || error?.status;
    let message;

    switch (status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        // Clear session storage
        sessionStorage.removeItem("authUser");
        // Redirect to login immediately
        window.location.replace("/login");
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error;
    }

    // Create a comprehensive error object that includes all necessary information
    const errorResponse = {
      message: error?.response?.data,
      status: error?.response?.status || error.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      errors: error?.response?.data?.errors,
      error: error?.response?.data?.error,
      url: error?.response?.config?.url,
      method: error?.response?.config?.method,
    };

    return Promise.reject(errorResponse);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

/**
 * Updates the language header based on current language
 */
const updateLanguageHeader = () => {
  const currentLang = localStorage.getItem("I18N_LANGUAGE") || "en";
  const languageHeader = currentLang === "ar" ? "ar" : "en";
  axios.defaults.headers.common["Accept-Language"] = languageHeader;
};

// Export the function so it can be called when language changes
export { updateLanguageHeader };

class APIClient {
  /**
   * Fetches data from the given URL
   */
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    let response: Promise<AxiosResponse>;

    let paramKeys: string[] = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  /**
   * Posts the given data to the URL
   */
  create = (url: string, data: any): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {};

    // If data is FormData, let browser set Content-Type with boundary
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    return axios.post(url, data, config);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const vendorId =
  getLoggedinUser()?.user?.user?.vendor?.vendor?.vendorId ?? null;

const vendorInfo = getLoggedinUser()?.user?.user?.vendor?.vendor ?? null;

const vendorProfileImage = getLoggedinUser()
  ? imgURL + "/" + getLoggedinUser()?.user?.user?.vendor?.vendor?.profileImage
  : null;

export {
  APIClient,
  setAuthorization,
  getLoggedinUser,
  vendorId,
  vendorInfo,
  vendorProfileImage,
};
