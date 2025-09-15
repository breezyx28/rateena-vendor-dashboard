import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { InvoicesList } from "./invoices-list";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getInvoicesListQuery } from "slices/thunks";
import { useTranslation } from "react-i18next";

const CustomersInvoices = () => {
  const { t } = useTranslation();
  document.title = "Customers Invoices | Rateena - E-Shop Vendor Panel";

  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Invoice;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    success: state.success,
    error: state.error,
    invoicesListSuccess: state.invoicesListSuccess,
    invoiceError: state.invoiceError,
  }));
  // Inside your component
  const { invoicesListSuccess, invoiceError } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    dispatch(getInvoicesListQuery());
  }, []);

  React.useEffect(() => {
    if (invoicesListSuccess) {
      console.log("invoicesListSuccess: ", invoicesListSuccess);
    }
    if (invoiceError) {
      console.log("invoiceError: ", invoiceError);
    }
  }, [invoiceError, invoicesListSuccess]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">{t("Search")}</h5>
                </CardHeader>
                <CardBody>
                  <InvoicesList data={invoicesListSuccess?.list ?? []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomersInvoices;
