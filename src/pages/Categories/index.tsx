import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useParams, Link } from "react-router-dom";
import { getVendorCategoriesQuery } from "slices/thunks";
import { CategoriesList } from "./categories-list";
import { useTranslation } from "react-i18next";
import BreadCrumb from "Components/Common/BreadCrumb";
import { vendorId } from "services/api-handles";

const Categories = () => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();

  document.title = "Categories | Rateena - E-Shop Vendor Panel";

  const selectLayoutState = (state: any) => state.Vendors;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    vendorCategories: state.vendorCategories,
    vendorError: state.vendorError,
    loading: state.loading,
  }));

  const { vendorCategories } = useSelector(selectLayoutProperties);

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorCategoriesQuery(vendorId));
    }
  }, [vendorId, dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Categories" pageTitle="Categories Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">{t("Categories List")}</h4>
                  <Link to={`/vendor/${vendorId}/categories/create`}>
                    <Button color="primary">
                      <i className="ri-add-line align-bottom me-1"></i>
                      {t("Add Category")}
                    </Button>
                  </Link>
                </CardHeader>
                <CardBody>
                  {vendorCategories?.list && (
                    <CategoriesList data={vendorCategories.list} />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Categories;
