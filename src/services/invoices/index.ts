import { APIClient } from "../api-handles";

import * as url from "../api-endpoints";

const api = new APIClient();

export const getInvoicesList = () => api.get(url.GET_INVOICE_LIST);
