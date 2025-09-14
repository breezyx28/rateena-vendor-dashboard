import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { CustomersList } from "./customers-list";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getCustomersListQuery } from "slices/thunks";
import { useTranslation } from "react-i18next";

const Customers = () => {
  const { t } = useTranslation();
  document.title = `${t("Customers")} | Rateena - E-Shop Vendor Panel`;

  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Customers;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    success: state.success,
    error: state.error,
    customersListSuccess: state.customersListSuccess,
    customersError: state.customersError,
  }));
  // Inside your component
  const { customersListSuccess, customersError } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    dispatch(getCustomersListQuery());
  }, []);

  React.useEffect(() => {
    if (customersListSuccess) {
      console.log("customersListSuccess: ", customersListSuccess);
    }
    if (customersError) {
      console.log("customersError: ", customersError);
    }
  }, [customersError, customersListSuccess]);

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
                  <CustomersList data={customersListSuccess?.list ?? []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Customers;
