import React, { useMemo, useState, useEffect } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Badge, FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteVendorCategoryMutation, toggleVendorCategoryQuery } from "slices/thunks";
import { useParams } from "react-router-dom";
import EditCategoryModal from "./edit-category-modal";

const CategoriesList = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const { vendorId } = useParams<{ vendorId: string }>();
  const dispatch: any = useDispatch();
  const [filter, setFilter] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({});

  useEffect(() => {
    if (data?.length > 0) {
      setFilter(data);
    }
  }, [data]);

  useEffect(() => {
    let filteredData = data;

    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (category) => category.category?.published === (statusFilter === "published")
      );
    }

    setFilter(filteredData);
  }, [data, statusFilter]);

  const toggleEditModal = () => setEditModal(!editModal);

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    toggleEditModal();
  };

  const handleDelete = (categoryId: number) => {
    if (window.confirm(t("Are you sure you want to delete this category?"))) {
      dispatch(deleteVendorCategoryMutation(categoryId, vendorId));
    }
  };

  const handleToggle = (categoryId: number, currentStatus: boolean) => {
    dispatch(toggleVendorCategoryQuery(categoryId));
  };

  const columns = useMemo(
    () => [
      {
        header: t("ID"),
        cell: (cell: any) => {
          return <span className="fw-semibold">{cell.getValue()}</span>;
        },
        accessorKey: "category.categoryId",
        enableColumnFilter: false,
      },
      {
        header: t("English Name"),
        accessorKey: "category.name",
        enableColumnFilter: false,
      },
      {
        header: t("Arabic Name"),
        accessorKey: "category.arName",
        enableColumnFilter: false,
      },
      {
        header: t("Products"),
        accessorKey: "numberOfProducts",
        enableColumnFilter: false,
      },
      {
        header: t("Status"),
        cell: (cell: any) => {
          const row = cell.row.original;
          const isPublished = row.category?.published || false;
          return (
            <FormGroup switch className="mb-0">
              <Input
                type="switch"
                checked={isPublished}
                onChange={() => handleToggle(row.category.categoryId, isPublished)}
                title={isPublished ? t("Unpublish") : t("Publish")}
              />
              <Label check></Label>
            </FormGroup>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: t("Action"),
        cell: (cell: any) => {
          const row = cell.row.original;
          return (
            <div className="d-flex gap-2 align-items-center">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleEdit(row)}
                title={t("Edit Category")}
              >
                <i className="ri-edit-line"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(row.category.categoryId)}
                title={t("Delete Category")}
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          );
        },
        enableColumnFilter: false,
      },
    ],
    [t, vendorId, handleToggle]
  );

  return (
    <React.Fragment>
      <div className="d-flex justify-content-start my-3 gap-3">
        <FormGroup>
          <Label htmlFor="statusFilter">{t("Filter by Status")}</Label>
          <select
            id="statusFilter"
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t("All Categories")}</option>
            <option value="published">{t("Published")}</option>
            <option value="unpublished">{t("Unpublished")}</option>
          </select>
        </FormGroup>
      </div>

      <TableContainer
        columns={columns || []}
        data={filter || []}
        isGlobalFilter={true}
        customPageSize={5}
        SearchPlaceholder={t("Search...")}
      />

      {data?.length > 0 ? (
        <EditCategoryModal
          modal_standard={editModal}
          tog_standard={toggleEditModal}
          categoryData={selectedCategory}
        />
      ) : null}
    </React.Fragment>
  );
};

export { CategoriesList };