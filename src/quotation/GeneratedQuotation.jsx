import React, { useState, useEffect } from "react";
import "./GeneratedQuotation.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuotations, deleteQuotation } from "../actions/quotationAction";
import { IoMdMore } from "react-icons/io";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { GeneratedQuotationMobile } from "./GeneratedQuotationMobile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to install and configure react-toastify

export const GeneratedQuotation = () => {
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
  const [expanded, setExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllQuotations());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    console.log(quotations);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Quotation deleted successfully");
    }
  }, [deleteSuccess]);

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Quotation deleted successfully");
    }
    if (deleteError) {
      toast.error("failed to delete the quotation");
    }
  }, [dispatch]);
  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {quotations.length === 0 ? (
        <div className="text-center fs-3">No quotation found</div>
      ) : (
        <>
          {isMobile ? (
            <GeneratedQuotationMobile
              quotations={quotations}
              toggleExpand={toggleExpand}
              expanded={expanded}
              handleMoreClick={handleMoreClick}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              selectedQuotationId={selectedQuotationId}
            />
          ) : (
            <div className="generatedQuotation">
              <div className="table-head">
                <span className="sr-head">Sr No.</span>
                <span className="client-head">Client</span>
                <span className="client-number-head">Phone</span>
                <span className="items-head">Items</span>
                <span className="total-head">Grand Total</span>
                <span className="status-head">Status</span>
                <span className="actions-head">Actions</span>
              </div>
              <div className="table-body">
                {quotations &&
                  quotations?.map((quotation, index) => (
                    <div className="table-row" key={quotation._id}>
                      <span className="sr">{index + 1}</span>
                      <span className="client">
                        <div className="client-name-address">
                          <span>{quotation?.client?.name}</span>
                          <span className="client-address">
                            {quotation?.client?.address ||
                              "No Address Available"}
                          </span>
                        </div>
                      </span>
                      <span className="client-number">
                        <span>
                          {quotation?.client?.number || "No Phone Available"}
                        </span>
                      </span>
                      <span className="items">
                        {expanded[quotation._id]
                          ? quotation?.items?.map((item, i) => (
                              <div key={i}>{item.description}</div>
                            ))
                          : quotation?.items
                              .slice(0, 1)
                              .map((item, i) => (
                                <div key={i}>{item.description}</div>
                              ))}
                        {quotation.items.length > 1 && (
                          <span
                            className="see-more-btn"
                            onClick={() => toggleExpand(quotation._id)}
                          >
                            {expanded[quotation._id] ? "See Less" : "See More"}
                          </span>
                        )}
                      </span>
                      <span className="total">{quotation.grandTotal}</span>
                      <span
                        className={`status rounded ${
                          quotation.status === "accepted"
                            ? "bg-success-subtle text-success"
                            : quotation.status === "pending"
                            ? "bg-warning-subtle text-warning"
                            : "bg-danger-subtle text-danger"
                        }`}
                        title={quotation?.rejectionReason}
                      >
                        {quotation.status}
                      </span>

                      <span className="actions" title="More">
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) =>
                            handleMoreClick(event, quotation._id)
                          }
                        >
                          <IoMdMore />
                        </IconButton>
                      </span>
                    </div>
                  ))}
              </div>

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
          )}
        </>
      )}
    </>
  );
};
