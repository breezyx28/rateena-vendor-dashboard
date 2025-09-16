import { APIClient, getLoggedinUser, vendorId } from "../api-handles";

import * as url from "../api-endpoints";

const api = new APIClient();

export const getHomeDetails = () =>
  api.get(url.GET_HOME_DETAILS.replace("{vendorId}", vendorId));
