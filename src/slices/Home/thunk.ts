import { getHomeDetails } from "services/Home";
import { homeDetailsError, homeDetailsSuccess } from "./reducer";

export const vendorHomeDetails = () => async (dispatch: any) => {
  try {
    let response;

    response = getHomeDetails();

    const data = await response;

    if (data) {
      dispatch(homeDetailsSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(homeDetailsError(error));
  }
};
