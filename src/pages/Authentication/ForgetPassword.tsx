import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";
import { useTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/Logo.png";
// import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const ForgetPasswordPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^(009665|\+9665|05)\d{8}$/)
        .required(t("Please Enter Your Phone Number")),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.history));
    },
  });

  const selectLayoutState = (state: any) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    forgetError: state.forgetError,
    forgetSuccessMsg: state.forgetSuccessMsg,
  }));
  // Inside your component
  const { forgetError, forgetSuccessMsg } = useSelector(selectLayoutProperties);

  React.useEffect(() => {
    if (forgetSuccessMsg) {
      console.log("forgotpwd: ", forgetSuccessMsg);

      setTimeout(() => {
        navigate("/verify-user", { state: forgetSuccessMsg });
      }, 1500);
    }
    if (forgetError) {
      console.log("forgotpwdError: ", forgetError);
    }
  }, [forgetError, forgetSuccessMsg]);

  document.title = `${t("Forgot Password")} | Rateena - E-Shop Vendor Panel`;
  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="20" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  {t("Premium Admin & Dashboard Template")}
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">{t("Forgot Password?")}</h5>
                    <p className="text-muted">
                      {t("Reset password with Rateena")}
                    </p>

                    <i className="ri-mail-send-line display-5 text-success mb-3"></i>
                  </div>

                  <Alert
                    className="border-0 alert-warning text-center mb-2 mx-2"
                    role="alert"
                  >
                    {t(
                      "Enter your phone number and instructions will be sent to you!"
                    )}
                  </Alert>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg?.message}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">{t("Phone")}</Label>
                        <Input
                          name="phone"
                          className="form-control"
                          placeholder={t("Enter Phone")}
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.phone}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          {t("Send OTP")}
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  {t("Wait, I remember my password...")}{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    {t("Click here")}{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
