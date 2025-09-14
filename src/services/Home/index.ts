import { APIClient, getLoggedinUser } from "../api-handles";

import * as url from "../api-endpoints";

const api = new APIClient();

const vendorId = getLoggedinUser()?.userId ?? null;

export const getHomeDetails = () =>
  api.get(url.GET_HOME_DETAILS.replace("{vendorId}", vendorId));
