import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  success: false,
  error: false,
  loading: false,
  invoicesListSuccess: null,
  invoiceData: null,
  invoiceInvoiceData: null,
  invoiceError: null,
};

const invoicesSlice = createSlice({
  name: "invoicesList",
  initialState,
  reducers: {
    invoiceSuccess(state, action) {
      state.invoiceData = action.payload;
      state.success = true;
      state.error = false;
    },
    invoiceInvoice(state, action) {
      state.invoiceInvoiceData = action.payload;
      state.success = true;
      state.error = false;
    },

    invoiceUpdated(state) {
      state.success = true;
      state.error = false;
    },
    invoicesListSuccess(state, action) {
      state.invoicesListSuccess = action.payload;
      state.success = true;
      state.error = false;
    },
    invoicesListError(state, action) {
      state.invoiceError = action.payload;
      state.success = false;
      state.error = true;
    },
    invoicesError(state, action) {
      state.invoiceError = action.payload;
      state.success = false;
      state.error = true;
    },
  },
});

export const {
  invoicesListSuccess,
  invoicesListError,
  invoiceSuccess,
  invoicesError,
  invoiceUpdated,
  invoiceInvoice,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
