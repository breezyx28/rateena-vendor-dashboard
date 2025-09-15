import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Button } from "reactstrap";
import { AdminUsersListTable } from "./UsersListTable";
import AddModal from "./add-user";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getVendorUsersListQuery } from "slices/thunks";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { t } = useTranslation();
  document.title = `${t("Users")} | Rateena - E-Shop Vendor Panel`;

  // const [modal_standard, setmodal_standard] = useState<boolean>(false);
  // function tog_standard() {
  //   setmodal_standard(!modal_standard);
  // }

  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Users;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    usersError: state.usersError,
    usersListSuccess: state.usersListSuccess,
    error: state.error,
  }));

  const { usersError, usersListSuccess } = useSelector(selectLayoutProperties);

  React.useEffect(() => {
    dispatch(getVendorUsersListQuery());
  }, []);

  React.useEffect(() => {
    if (usersListSuccess) {
      console.log("usersListSuccess: ", usersListSuccess);
    }
    if (usersError) {
      console.log("usersError: ", usersError);
    }
  }, [usersError, usersListSuccess]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <div className="live-preview w-full d-flex justify-content-end">
                  {/* <div>
                    <Button color="primary" onClick={tog_standard}>
                      {t("Add User")}
                    </Button>
                  </div> */}
                </div>
                <CardHeader>
                  <h5 className="card-title mb-0">{t("Search")}</h5>
                </CardHeader>
                <CardBody>
                  <AdminUsersListTable data={usersListSuccess?.list ?? []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* Add User Modal */}
        {/* <AddModal modal_standard={modal_standard} tog_standard={tog_standard} /> */}
      </div>
    </React.Fragment>
  );
};

export default Users;
