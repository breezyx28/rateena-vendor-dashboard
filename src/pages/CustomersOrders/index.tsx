import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { OrdersList } from "./orders-list";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getOrdersListQuery } from "slices/thunks";
import { useTranslation } from "react-i18next";

const CustomersOrders = () => {
  const { t } = useTranslation();
  document.title = "Customers Orders | Rateena - E-Shop Vendor Panel";

  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Orders;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    success: state.success,
    error: state.error,
    ordersListSuccess: state.ordersListSuccess,
    ordersError: state.ordersError,
  }));
  // Inside your component
  const { ordersListSuccess, ordersError } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    dispatch(getOrdersListQuery());
  }, []);

  React.useEffect(() => {
    if (ordersListSuccess) {
      console.log("ordersListSuccess: ", ordersListSuccess);
    }
    if (ordersError) {
      console.log("ordersError: ", ordersError);
    }
  }, [ordersError, ordersListSuccess]);

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
                  <OrdersList data={ordersListSuccess?.list ?? []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomersOrders;
