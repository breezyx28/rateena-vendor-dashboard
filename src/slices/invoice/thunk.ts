import { invoicesListError, invoicesListSuccess } from "./reducer";
import { getInvoicesList } from "services/invoices";

export const getInvoicesListQuery = () => async (dispatch: any) => {
  try {
    let response;

    response = getInvoicesList();

    const data = await response;

    if (data) {
      dispatch(invoicesListSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(invoicesListError(error));
  }
};
