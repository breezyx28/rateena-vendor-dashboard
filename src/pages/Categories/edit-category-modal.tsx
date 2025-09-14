import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  updateVendorCategoryMutation,
  resetVendorProductState,
} from "slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { vendorId } from "services/api-handles";

const EditCategoryModal = ({
  modal_standard,
  tog_standard,
  categoryData,
}: {
  modal_standard: boolean;
  tog_standard: () => any;
  categoryData: any;
}) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Vendors;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    vendorError: state.vendorError,
    vendorCategoriesSuccess: state.vendorCategoriesSuccess,
  }));

  const { vendorError, vendorCategoriesSuccess } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    if (vendorCategoriesSuccess) {
      Swal.fire({
        title: "Category Updated Successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        dispatch(resetVendorProductState());
        tog_standard();
      });
    }
    if (vendorError?.message) {
      Swal.fire({
        title: t("Error Updating Category"),
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        dispatch(resetVendorProductState());
      });
    }
  }, [vendorError, vendorCategoriesSuccess]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryData?.category?.name || "",
      arName: categoryData?.category?.arName || "",
      isPublished: categoryData?.category?.published
        ? "published"
        : "unpublished",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter English Name"),
      arName: Yup.string().required("Please Enter Arabic Name"),
      isPublished: Yup.string().required("Please Select Status"),
    }),
    onSubmit: (values) => {
      const formData = {
        categoryId: categoryData?.category?.categoryId,
        name: values.name,
        ar_name: values.arName,
        is_published: values.isPublished === "published",
      };
      dispatch(updateVendorCategoryMutation(formData, vendorId));
    },
  });

  return (
    <Modal
      id="editCategoryModal"
      isOpen={modal_standard}
      toggle={tog_standard}
      size="lg"
    >
      <ModalHeader
        className="modal-title"
        id="editCategoryModalLabel"
        toggle={tog_standard}
      >
        {t("Edit Category")}
      </ModalHeader>
      <ModalBody className="py-3">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          id="edit-category-form"
        >
          {vendorError?.message && !vendorCategoriesSuccess && (
            <Alert color="danger">{vendorError?.message}</Alert>
          )}

          <Row className="gy-3">
            <Col xxl={6} md={6}>
              <div>
                <Label htmlFor="name" className="form-label">
                  {t("English Name")}
                </Label>
                <Input
                  type="text"
                  className="form-control form-control-sm"
                  bsSize="sm"
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
                  <FormFeedback>{String(validation.errors.name)}</FormFeedback>
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
                  className="form-control form-control-sm"
                  bsSize="sm"
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
                  <FormFeedback>
                    {String(validation.errors.arName)}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col xxl={12} md={12}>
              <div>
                <Label htmlFor="isPublished" className="form-label">
                  {t("Status")}
                </Label>
                <select
                  className="form-select form-select-sm"
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

          <Button
            type="submit"
            id="edit-category-btn"
            style={{ visibility: "hidden" }}
          >
            Submit
          </Button>
        </Form>
      </ModalBody>
      <div className="modal-footer">
        <Button color="light" onClick={tog_standard}>
          {t("Close")}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            document.getElementById("edit-category-btn")?.click();
          }}
        >
          {t("Save changes")}
        </Button>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
