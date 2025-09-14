import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Button } from "reactstrap";
import { ProductsList } from "./products-list";
import { Link, redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getProductsQuery, getVendorProductsQuery } from "slices/thunks";
import AddProductModal from "./modals/add-product-modal";
import { vendorId } from "services/api-handles";

const Products = () => {
  const { t } = useTranslation();
  const [vendorProductsData, setVendorProductsData] = useState<any[]>([]);
  const [modal_standard, setmodal_standard] = useState<boolean>(false);
  function tog_standard() {
    setmodal_standard(!modal_standard);
  }

  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Vendors;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    vendorError: state.vendorError,
    vendorProducts: state.vendorProducts,
    vendorProductsSuccess: state.vendorProductsSuccess,
    error: state.error,
  }));
  // Inside your component
  const { vendorError, vendorProducts, vendorProductsSuccess } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    if (vendorId) {
      dispatch(getVendorProductsQuery(vendorId));
    }
  }, [vendorId]);

  React.useEffect(() => {
    if (vendorProducts?.list) {
      console.log("vendorProducts: ", vendorProducts.list);
      setVendorProductsData(vendorProducts?.list);
    }
    if (vendorProductsSuccess) {
      console.log("vendorProductsSuccess: ", vendorProductsSuccess);
      tog_standard();
    }
    if (vendorError?.message || vendorError?.errors) {
      console.log("vendorError: ", vendorError);
    }
  }, [vendorProducts, vendorError, vendorProductsSuccess]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">{t("Products")}</h5>
                </CardHeader>
                <CardBody>
                  <div className="w-full d-flex justify-content-end">
                    <Link
                      className="btn btn-primary"
                      to={"/dashboard/produtcs/add"}
                      color="primary"
                    >
                      {t("Add Product")}
                    </Link>
                  </div>
                  <ProductsList data={vendorProductsData ?? []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Products;
