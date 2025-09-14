//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
} from "./reducer";

// Is user register successfull then direct plot user in redux.
export const registerUser = (user: any) => async (dispatch: any) => {
  try {
    let response;

    response = postFakeRegister(user);
    const data: any = await response;

    if (data.message === "success") {
      dispatch(registerUserSuccessful(data));
    } else {
      dispatch(registerUserFailed(data));
    }
  } catch (error: any) {
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};
