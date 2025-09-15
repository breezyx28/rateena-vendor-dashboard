import { APIClient } from "../api-handles";

import * as url from "../api-endpoints";

const api = new APIClient();

export const getUsersList = () => api.get(url.GET_USERS_LIST);
export const getUser = (userId: any) =>
  api.get(url.GET_USER.replace("{userId}", userId));

export const postAddOrUpdateUser = (data: any) =>
  api.create(url.POST_USER_CREATE_OR_UPDATE, data);
export const postResetUserPassword = (data: any) =>
  api.create(url.POST_RESET_USERS_PASSWORD, data);
export const postDeleteUser = (userId: any) =>
  api.delete(url.POST_USER_DELETE.replace("{userId}", userId.toString()), {});
