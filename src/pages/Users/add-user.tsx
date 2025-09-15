import React, { useState } from "react";
import {
  Alert,
  Col,
  Form,
  Input,
  Label,
  Row,
  Container,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { addOrUpdateUserMutation } from "slices/thunks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { vendorId } from "services/api-handles";

const AddUser: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const selectLayoutState = (state: any) => state.Users;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    usersError: state.usersError,
    userAdded: state.userAdded,
    userData: state.userData,
    error: state.error,
  }));

  const { usersError, error, userAdded, userData } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    if (userData && userAdded) {
      console.log("userData: ", userData);
      Swal.fire({
        title: t("Success!"),
        text: t("User added successfully"),
        icon: "success",
        html: `
          <p>${t("User added successfully")}</p>
          <div style="margin-top: 20px; text-align: left;">
            <label style="display: flex; align-items: center; font-size: 14px;">
              <input type="checkbox" id="dontAskAgain" style="margin-right: 8px;">
              ${t("Don't ask again")}
            </label>
          </div>
        `,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: t("Go to Users List"),
        denyButtonText: t("Stay Here"),
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#6c757d",
        buttonsStyling: true,
        customClass: {
          actions: 'swal2-actions-flex'
        }
      }).then((result) => {
        const checkbox = document.getElementById('dontAskAgain') as HTMLInputElement;
        if (checkbox?.checked) {
          localStorage.setItem("skipUserNavigationPrompt", "true");
        }
        
        if (result.isConfirmed) {
          navigate("/dashboard/users");
        }
        // If denied, stay on current page - do nothing
      });
    }
    if (usersError) {
      console.log("usersError: ", usersError);
    }
  }, [usersError, userAdded, userData, t, navigate]);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t("Please Enter Your Email")),
      phone: Yup.string().required(t("Please Enter Your Phone Number")),
      password: Yup.string().required(t("Please Enter Your Password")),
    }),
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: t("Are you sure?"),
        text: t("Do you want to add this user?"),
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("Yes, add it!"),
        cancelButtonText: t("Cancel"),
      });

      if (result.isConfirmed) {
        dispatch(addOrUpdateUserMutation({ ...values, vendorId }));
      }
    },
  });

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <h4 className="card-title mb-0">{t("Add User")}</h4>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                id="add-vendor-user-form"
              >
                <Row className="gy-4">
                  <Col xxl={12} md={12}>
                    <div>
                      <Label htmlFor="phone" className="form-label">
                        {t("Phone")}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone && validation.errors.phone
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Col>
                  <Col xxl={12} md={12}>
                    <div>
                      <Label htmlFor="email" className="form-label">
                        {t("Email")}
                      </Label>
                      <div className="form-icon">
                        <Input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xxl={12} md={12}>
                    <div>
                      <Label htmlFor="password" className="form-label">
                        {t("Password")}
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Button
                  type={"submit"}
                  id="add-vendor-user-btn"
                  style={{
                    visibility: "hidden",
                  }}
                >
                  Submit
                </Button>
                <div className="text-end">
                  <Button
                    color="light"
                    className="me-2"
                    onClick={() => navigate("/users")}
                  >
                    {t("Cancel")}
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      document.getElementById("add-vendor-user-btn")?.click();
                    }}
                  >
                    {t("Save User")}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddUser;
