import {
  userAdded,
  userSuccess,
  userUpdated,
  usersError,
  usersListError,
  usersListSuccess,
} from "./reducer";
import {
  getUser,
  getUsersList,
  postAddOrUpdateUser,
  postDeleteUser,
  postResetUserPassword,
} from "services/users";

export const getVendorUsersListQuery = () => async (dispatch: any) => {
  try {
    let response;

    response = getUsersList();

    const data = await response;

    if (data) {
      dispatch(usersListSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(usersListError(error));
  }
};

export const getAdminUserQuery = (userId: any) => async (dispatch: any) => {
  try {
    let response;

    response = getUser(userId);

    const data = await response;

    if (data) {
      dispatch(userSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(usersListError(error));
  }
};

export const addOrUpdateUserMutation = (body: any) => async (dispatch: any) => {
  try {
    let response;

    response = postAddOrUpdateUser(body);

    const data = await response;

    if (data) {
      if (body?.userId) {
        dispatch(userUpdated());
        dispatch(userSuccess(data));
      } else {
        dispatch(userAdded());
        dispatch(userSuccess(data));
      }
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(usersError(error));
  }
};

export const deleteAdminUserMutation =
  (userId: any) => async (dispatch: any) => {
    try {
      let response;

      response = postDeleteUser({ userId });

      const data = await response;

      if (data) {
        dispatch(userUpdated());
        dispatch(getVendorUsersListQuery());
      }
    } catch (error: any) {
      console.log("errors: ", error);
      dispatch(usersError(error));
    }
  };

export const resetAdminUserPasswordMutation =
  (body: any) => async (dispatch: any) => {
    try {
      let response;

      response = postResetUserPassword(body);

      const data = await response;

      if (data) {
        dispatch(userUpdated());
      }
    } catch (error: any) {
      console.log("errors: ", error);

      dispatch(usersError(error));
    }
  };
