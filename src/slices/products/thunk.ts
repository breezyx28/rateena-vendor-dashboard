import {
  addOption,
  addProductImage,
  deleteOption,
  deleteProduct,
  getProduct,
  getProducts,
  removeProductImage,
  toggleProductApprove,
  toggleProductPublish,
} from "services/products";
import {
  productSuccess,
  productUpdated,
  productsError,
  productsListError,
  productsListSuccess,
} from "./reducer";
import { getVendorProductsQuery } from "slices/thunks";
import { vendorId } from "services/api-handles";

export const getProductsQuery = () => async (dispatch: any) => {
  try {
    let response;

    response = getProducts();

    const data = await response;

    if (data) {
      dispatch(productsListSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(productsListError(error));
  }
};

export const getProductQuery = (productId: any) => async (dispatch: any) => {
  try {
    let response;

    response = getProduct(productId);

    const data = await response;

    if (data) {
      dispatch(productSuccess(data));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(productsListError(error));
  }
};

export const toggleProductPublishQuery =
  (productId: any) => async (dispatch: any) => {
    try {
      let response;
      response = toggleProductPublish(productId);
      const data = await response;
      if (data) {
        dispatch(productSuccess(data));
        dispatch(getProductQuery(productId));
      }
    } catch (error: any) {
      console.log("errors: ", error);
      dispatch(productsListError(error));
    }
  };

export const toggleProductApproveQuery =
  (productId: any) => async (dispatch: any) => {
    try {
      let response;
      response = toggleProductApprove(productId);
      const data = await response;
      if (data) {
        dispatch(productSuccess(data));
        dispatch(getProductQuery(productId));
      }
    } catch (error: any) {
      console.log("errors: ", error);
      dispatch(productsListError(error));
    }
  };

export const addProductImageMutation =
  (body: any, productId: any) => async (dispatch: any) => {
    try {
      let response;

      response = addProductImage(productId, body);

      const data = await response;

      if (data) {
        dispatch(productUpdated());
        dispatch(getProductQuery(productId));
      }
    } catch (error: any) {
      console.log("errors: ", error);

      dispatch(productsError(error));
    }
  };

export const deleteProductMutation =
  (productId: any) => async (dispatch: any) => {
    try {
      let response;

      response = deleteProduct(productId);

      const data = await response;

      if (data) {
        dispatch(productUpdated());
        dispatch(getProductQuery(productId));
        dispatch(getVendorProductsQuery(vendorId));
      }
    } catch (error: any) {
      console.log("errors: ", error);

      dispatch(productsError(error));
    }
  };

export const deleteProductImageMutation =
  (productId: any, imagePath: string) => async (dispatch: any) => {
    try {
      let response;

      response = removeProductImage(productId, imagePath);

      const data = await response;

      if (data) {
        dispatch(productUpdated());
        dispatch(getProductQuery(productId));
      }
    } catch (error: any) {
      console.log("errors: ", error);

      dispatch(productsError(error));
    }
  };

// Options

export const addOptionMutation = (body: any) => async (dispatch: any) => {
  try {
    let response;

    response = addOption(body);

    const data = await response;

    if (data) {
      dispatch(productUpdated());
      dispatch(getProductQuery(body.productId));
    }
  } catch (error: any) {
    console.log("errors: ", error);

    dispatch(productsError(error));
  }
};

export const deleteOptionMutation =
  (optionId: any, productId: any) => async (dispatch: any) => {
    try {
      let response;

      response = deleteOption(optionId);

      const data = await response;

      if (data) {
        dispatch(productUpdated());
        dispatch(getProductQuery(productId));
      }
    } catch (error: any) {
      console.log("errors: ", error);

      dispatch(productsError(error));
    }
  };
