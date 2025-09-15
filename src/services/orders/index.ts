import { APIClient } from "../api-handles";

import * as url from "../api-endpoints";

const api = new APIClient();

export const getOrdersList = () => api.get(url.GET_ORDERS_LIST);
export const getOrder = (orderId: any) =>
  api.get(url.GET_ORDER.replace("{orderId}", orderId));
export const getOrderInvoice = (orderId: any) =>
  api.get(url.GET_ORDER_INVOICE.replace("{orderId}", orderId));
