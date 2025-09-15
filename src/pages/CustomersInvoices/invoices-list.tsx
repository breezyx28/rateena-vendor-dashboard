import React, { useMemo, useState } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Button, Col, Input, Label, Row } from "reactstrap";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { TPaymentStatus } from "types";
import { useTranslation } from "react-i18next";

const InvoicesList = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) => {
    const statusMatch = statusFilter ? row.status === statusFilter : true;
    const paymentMatch = paymentTypeFilter
      ? row?.paymentMethod === paymentTypeFilter
      : true;

    const dateMatch =
      startDate && endDate
        ? new Date(row.issueDate || "2025-01-01") >= new Date(startDate) &&
          new Date(row.issueDate || "2025-01-01") <= new Date(endDate)
        : true;

    const searchMatch = searchTerm
      ? row.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // row.customer?.customer?.firstName
        //   ?.toLowerCase()
        //   .includes(searchTerm.toLowerCase()) ||
        // row.customer?.customer?.lastName
        //   ?.toLowerCase()
        //   .includes(searchTerm.toLowerCase()) ||
        // row.customer?.customer?.phone?.includes(searchTerm) ||
        row.status?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return statusMatch && paymentMatch && dateMatch && searchMatch;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(
      workbook,
      `invoices-${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const statusCellBadge = (status: TPaymentStatus) => {
    switch (status) {
      case "UNPAID":
        return (
          <span className="badge bg-danger-subtle text-danger">
            {t("UNPAID")}
          </span>
        );
      case "PAID":
        return (
          <span className="badge bg-success-subtle text-success">
            {t("PAID")}
          </span>
        );
      default:
        return (
          <span className="badge bg-secondary-subtle text-secondary">
            {status}
          </span>
        );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: t("Invoice Number"),
        accessorKey: "invoiceNumber",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <span
            className="fw-semibold"
            key={"invoice-number-" + cell.getValue()}
          >
            {cell.getValue()}
          </span>
        ),
      },
      {
        header: t("Payment Method"),
        accessorKey: "paymentMethod",
        enableColumnFilter: false,
        cell: (cell: any) => cell.getValue() || "",
      },
      {
        header: t("Invoice Date"),
        accessorKey: "fIssueDate",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <div className="text-muted">{cell.getValue()}</div>
        ),
      },
      {
        header: t("Status"),
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => statusCellBadge(cell.getValue()),
      },
      {
        header: t("Total"),
        accessorKey: "total",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const row = cell.row.original;
          return (
            <span key={"order-total-" + row.summary.total}>
              {row.summary.total + " AED"}
            </span>
          );
        },
      },
      {
        header: t("Invoice"),
        accessorKey: "orderId",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const row = cell.row.original;
          return (
            <Link
              key={"order-action-" + row.order.order_id}
              to={`/dashboard/customers/orders/${row.order.order_id}`}
              className="link-info"
            >
              {t("Get Invoice")}
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      {/* Filters Row */}
      <Row className="mb-3">
        <Col md={2}>
          <Label>{t("Search")}</Label>
          <Input
            type="text"
            placeholder={t("Search invoice ...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col md={2}>
          <Label>{t("Status")}</Label>
          <Input
            type="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">{t("All")}</option>
            <option value="PAID">{t("PAID")}</option>
            <option value="UNPAID">{t("UNPAID")}</option>
          </Input>
        </Col>
        <Col md={2}>
          <Label>{t("Payment Method")}</Label>
          <Input
            type="select"
            value={paymentTypeFilter}
            onChange={(e) => setPaymentTypeFilter(e.target.value)}
          >
            <option value="">{t("All")}</option>
            <option value="CASH">CASH</option>
            <option value="VISA">VISA</option>
          </Input>
        </Col>
        <Col md={2}>
          <Label>{t("Start Date")}</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Label>{t("End Date")}</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button color="success" onClick={exportToExcel} className="w-100">
            {t("Export Excel")}
          </Button>
        </Col>
      </Row>

      <TableContainer
        columns={columns || []}
        data={filteredData || []}
        isGlobalFilter={false}
        customPageSize={5}
      />
    </React.Fragment>
  );
};

export { InvoicesList };
