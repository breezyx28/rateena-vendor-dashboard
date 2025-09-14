import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import Swal from "sweetalert2";
import { addVendorCategoryMutation, resetVendorProductState } from "slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import BreadCrumb from "Components/Common/BreadCrumb";

const CreateCategory = () => {
  const { t } = useTranslation();
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  document.title = "Create Category | Rateena - E-Shop Vendor Panel";

  const selectLayoutState = (state: any) => state.Vendors;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    vendorError: state.vendorError,
    vendorCategoriesSuccess: state.vendorCategoriesSuccess,
  }));

  const { vendorError, vendorCategoriesSuccess } = useSelector(selectLayoutProperties);

  React.useEffect(() => {
    if (vendorCategoriesSuccess) {
      Swal.fire({
        title: "Category has been added successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        dispatch(resetVendorProductState());
        navigate(`/vendor/${vendorId}/categories`);
      });
    }
    if (vendorError?.message) {
      Swal.fire({
        title: t("Error Adding Category"),
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        dispatch(resetVendorProductState());
      });
    }
  }, [vendorError, vendorCategoriesSuccess, dispatch, navigate, vendorId, t]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      arName: "",
      isPublished: "published",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter English Name"),
      arName: Yup.string().required("Please Enter Arabic Name"),
      isPublished: Yup.string().required("Please Select Status"),
    }),
    onSubmit: (values) => {
      const formData = {
        name: values.name,
        ar_name: values.arName,
        is_published: values.isPublished === "published",
      };
      dispatch(addVendorCategoryMutation(formData, vendorId));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Category" pageTitle="Categories" />
          <Card>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                {vendorError?.message && !vendorCategoriesSuccess ? (
                  <Alert color="danger">{vendorError?.message}</Alert>
                ) : null}
                
                <Row className="gy-4">
                  <Col xxl={6} md={6}>
                    <div>
                      <Label htmlFor="name" className="form-label">
                        {t("English Name")}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          <div>{String(validation.errors.name)}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col xxl={6} md={6}>
                    <div>
                      <Label htmlFor="arName" className="form-label">
                        {t("Arabic Name")}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="arName"
                        name="arName"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.arName || ""}
                        invalid={
                          validation.touched.arName && validation.errors.arName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.arName && validation.errors.arName ? (
                        <FormFeedback type="invalid">
                          <div>{String(validation.errors.arName)}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col xxl={6} md={6}>
                    <div>
                      <Label htmlFor="isPublished" className="form-label">
                        {t("Status")}
                      </Label>
                      <select
                        className="form-select"
                        id="isPublished"
                        name="isPublished"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.isPublished || ""}
                      >
                        <option value="">{t("Select Status")}</option>
                        <option value="published">{t("Published")}</option>
                        <option value="unpublished">{t("Unpublished")}</option>
                      </select>
                      {validation.touched.isPublished &&
                      validation.errors.isPublished ? (
                        <div className="text-danger mt-1">
                          {String(validation.errors.isPublished)}
                        </div>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="hstack gap-2 justify-content-end mt-4">
                  <Button
                    type="button"
                    color="light"
                    onClick={() => navigate(`/vendor/${vendorId}/categories`)}
                  >
                    {t("Cancel")}
                  </Button>
                  <Button type="submit" color="primary">
                    {t("Create Category")}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateCategory;