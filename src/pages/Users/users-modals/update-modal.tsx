import React, { useState } from "react";
import { Alert, Col, Form, Input, Label, Row } from "reactstrap";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { addOrUpdateUserMutation } from "slices/thunks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { vendorId } from "services/api-handles";

interface AddModalProps {
  modal_standard: boolean;
  tog_standard: () => void;
  userId?: string;
  userData?: any;
}

const UpdateModal: React.FC<AddModalProps> = ({
  modal_standard,
  tog_standard,
  userId,
  userData,
}) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.Users;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    usersError: state.usersError,
    userUpdated: state.userUpdated,
    error: state.error,
  }));

  const { usersError, error, userUpdated } = useSelector(
    selectLayoutProperties
  );

  React.useEffect(() => {
    if (userUpdated) {
      Swal.fire({
        title: t("Success!"),
        text: t("User updated successfully"),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        tog_standard();
      });
    }
    if (usersError) {
      console.log("usersError: ", usersError);
    }
  }, [usersError, userUpdated, t, tog_standard]);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userData?.email || "",
      phone: userData?.phone || "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t("Please Enter Your Email")),
      phone: Yup.string().required(t("Please Enter Your Phone Number")),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      const result = await Swal.fire({
        title: t("Are you sure?"),
        text: t("Do you want to update this user?"),
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("Yes, update it!"),
        cancelButtonText: t("Cancel"),
      });

      if (result.isConfirmed) {
        dispatch(addOrUpdateUserMutation({ ...values, userId, vendorId }));
      }
    },
  });

  return (
    <React.Fragment>
      <Modal
        id="myModal"
        isOpen={modal_standard}
        toggle={() => {
          tog_standard();
        }}
      >
        <ModalHeader
          className="modal-title"
          id="myModalLabel"
          toggle={() => {
            tog_standard();
          }}
        >
          {t("Update User")}
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
            id="add-admin-user-form"
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
                    Password
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
                      validation.touched.password && validation.errors.password
                        ? true
                        : false
                    }
                  />
                </div>
              </Col>
            </Row>
            <Button
              type={"submit"}
              id="add-admin-user-btn"
              style={{
                visibility: "hidden",
              }}
            >
              Submit
            </Button>
          </Form>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="light"
            onClick={() => {
              tog_standard();
            }}
          >
            {t("Close")}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              document.getElementById("add-admin-user-btn")?.click();
            }}
          >
            {t("Save changes")}
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateModal;
