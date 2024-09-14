import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuotation } from "../actions/quotationAction";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify"; // Make sure to install and configure react-toastify
import "./GeneratedQuotationMobile.css";
import { useNavigate } from "react-router-dom";

export const GeneratedQuotationMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quotations, loading, error } = useSelector(
    (state) => state.allQuotations
  );
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteQuotationData);

  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Quotation deleted successfully");
    }
    if (deleteError) {
      toast.error("Failed to delete the quotation");
    }
  }, [deleteSuccess, deleteError]);

  const handleMoreClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuotationId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
    navigate(`/edit/quotation/${selectedQuotationId}`);
  };

  const handleDeleteClick = () => {
    setOpenConfirmDialog(true);
    handleClose();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteQuotation(selectedQuotationId));
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {quotations &&
        quotations.map((quotation) => (
          <Accordion
            expanded={expanded === quotation._id}
            onChange={handleAccordionChange(quotation._id)}
            key={quotation._id}
            className="accordion-main"
          >
            <AccordionSummary className="rounded" expandIcon={<MdExpandMore />}>
              <div className="accordion-summary">
                <div className="name-phone">
                  <span className="name">
                    {quotation?.client?.name || "NA"}
                  </span>
                  <span className="phone">{quotation.client.number}</span>
                </div>
                <div>
                  <span
                    className={`status ${
                      quotation.status === "accepted"
                        ? "text-success"
                        : quotation.status === "pending"
                        ? "text-warning"
                        : "text-danger"
                    }`}
                    title={quotation?.rejectionReason}
                  >
                    {quotation.status}
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              <div className="accordion-address">
                <span className="d-flex">
                  <p className="pe-2 fw-bold">Address :</p>
                  {quotation.client.address}{" "}
                </span>
                <span style={{ marginLeft: "8px" }}>
                  <IoMdMore
                    onClick={(event) => handleMoreClick(event, quotation._id)}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </div>
              <div className="accordion-items">
                <p className="pe-2 fw-bold">Items: </p>
                {quotation.items.map((item, i) => (
                  <div key={i}>&bull; {item.description}</div>
                ))}
              </div>

              <div className="accordion-total">
                <p className="pe-2 fw-bold">Total: </p>
                {quotation.grandTotal}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

      {/* MUI Box with Edit and Delete options */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this quotation?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
