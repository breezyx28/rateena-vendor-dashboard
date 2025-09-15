import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface DeleteConfirmationModalProps {
  modal_standard: boolean;
  tog_standard: () => void;
  onConfirm: () => void;
  userId?: string;
  userName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  modal_standard,
  tog_standard,
  onConfirm,
  userId,
  userName,
}) => {
  const { t } = useTranslation();
  const handleConfirm = async () => {
    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("This action cannot be undone!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("Cancel")
    });

    if (result.isConfirmed) {
      onConfirm();
      await Swal.fire({
        title: t("Deleted!"),
        text: t("User has been deleted successfully"),
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
      tog_standard();
    }
  };

  return (
    <React.Fragment>
      <Modal
        id="deleteConfirmationModal"
        isOpen={modal_standard}
        toggle={() => {
          tog_standard();
        }}
        centered
      >
        <ModalHeader
          className="modal-title"
          id="deleteConfirmationModalLabel"
          toggle={() => {
            tog_standard();
          }}
        >
          {t("Confirm Delete")}
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <div className="mb-4">
              <i
                className="las la-exclamation-triangle text-warning"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h5 className="mb-3">{t("Are you sure you want to delete this user?")}</h5>
            {userName && (
              <p className="text-muted mb-4">
                {t("User:")}{" "}<strong>{userName}</strong> ({t("ID:")}{" "}{userId})
              </p>
            )}
          </div>
        </ModalBody>
        <div className="modal-footer justify-content-center">
          <Button
            color="light"
            onClick={() => {
              tog_standard();
            }}
          >
            {t("Cancel")}
          </Button>
          <Button color="danger" onClick={handleConfirm}>
            {t("Delete User")}
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteConfirmationModal;
