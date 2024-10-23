import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import "./QuotationReview.css";
import { useParams } from "react-router-dom";
import { getQuotationById } from "../actions/quotationAction";
import Loader from "../Components/header/Loader";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Select, MenuItem, TextField, Button } from "@mui/material";
import { updateQuotation } from "../actions/quotationAction";
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";
import PdfPreview from "./PDFPreview";

const SignQuotation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, quotation } = useSelector((state) => state.getQuotationById);
  const {
    loading: updateLoading,
    success,
    error,
  } = useSelector((state) => state.updatedQuotationData);
  const pdfRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (id) {
      dispatch(getQuotationById(id));
    }
  }, [dispatch, id]);

  // Format the createdAt date from the quotation data
  const formattedDate = quotation?.createdAt
    ? format(new Date(quotation.createdAt), "dd - MMMM - yyyy h:mm a")
    : "";

  const handleGeneratePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 4 }, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
      pdf.save("quotation.pdf");
    });
  };

  const handleGenerateImage = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 4 }, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "quotation.png";
      link.click();
    });
  };

  const handleSigning = () => {
    const dataToBeUpdated = {
      status: "accepted",
    };
    dispatch(updateQuotation(id, dataToBeUpdated));
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleReject = () => {
    let rejectionReason = selectedReason;
    if (selectedReason === "Other") {
      rejectionReason = customReason;
    }
    const dataToBeUpdated = {
      status: "rejected",
      rejectionReason,
    };
    dispatch(updateQuotation(id, dataToBeUpdated));
  };
  useEffect(() => {
    if (success) {
      toast.success("Success");

      dispatch(getQuotationById(id));
    }
    if (error) {
      toast.error("Failed to reject this quotation");
    }
  }, [success, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="review-main">
          <PdfPreview
            pdfRef={pdfRef}
            quotation={quotation}
            formattedDate={formattedDate}
          />
          <div className="action-button">
            {/* Show sign-consent and reject div if clientSignature is 0 and status is not rejected */}
            {quotation?.status === "pending" &&
              quotation?.status !== "rejected" && (
                <>
                  <div className="sign-consent">
                    <div className="sign-consent-1">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="consent" className="ps-2">
                        I have read all the details carefully and I agree with
                        it
                      </label>
                    </div>
                    <button
                      className={`sign-button ${isChecked ? "" : "disabled"}`}
                      disabled={!isChecked || updateLoading}
                      onClick={handleSigning}
                    >
                      {updateLoading ? "signing..." : "Sign It"}
                    </button>
                  </div>

                  {/* Rejection form */}
                  <div className="reject-reason">
                    <h5 className="mt-3">
                      Don't want to sign it? Please tell us why
                    </h5>
                    <Select
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="" disabled>
                        Select a reason
                      </MenuItem>
                      <MenuItem value="Price is too high">
                        Price is too high
                      </MenuItem>
                      <MenuItem value="Not satisfied with terms">
                        Not satisfied with terms
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>

                    {selectedReason === "Other" && (
                      <TextField
                        label="Please specify"
                        fullWidth
                        className="mt-2"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                      />
                    )}

                    <Button
                      variant="contained"
                      color="error"
                      className="mt-3"
                      onClick={handleReject}
                      fullWidth
                      disabled={
                        !selectedReason ||
                        (selectedReason === "Other" && !customReason)
                      }
                    >
                      Reject Quotation
                    </Button>
                  </div>
                </>
              )}

            {/* Show you rejected message if clientSignature is greater than 0 and status is rejected */}
            {quotation?.status === "rejected" && (
              <>
                <div className="signed-successful">
                  <div className="signed-successful-top">
                    <span>
                      <FaTimesCircle size={80} color="red" />
                    </span>
                    <h1 className="fs-5 mt-2">
                      You rejected this quotation ❌
                    </h1>
                    <span className="text-secondary fs-6">
                      What's next? Call us or wait for our call
                    </span>
                  </div>
                </div>
                <div className="sign-consent mt-3">
                  <div className="sign-consent-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="consent" className="ps-2">
                      Rejectd it by accidently? Sign it here
                    </label>
                  </div>
                  <button
                    className={`sign-button ${isChecked ? "" : "disabled"}`}
                    disabled={!isChecked || updateLoading}
                    onClick={handleSigning}
                  >
                    {updateLoading ? "signing..." : "Sign It"}
                  </button>
                </div>
              </>
            )}

            {/* Show deal is done and download/share buttons if clientSignature is available */}
            {quotation?.status == "accepted" &&
              quotation?.status !== "rejected" && (
                <>
                  <>
                    <div className="signed-successful">
                      <div className="signed-successful-top">
                        <span>
                          <FaCheckCircle size={80} color="green" />
                        </span>
                        <h1 className="fs-5 mt-2">
                          Congratulation! The deal is done 🤝
                        </h1>
                        <span className="text-secondary fs-6">
                          What's next? Call us or wait for our call
                        </span>
                      </div>
                    </div>
                  </>
                  <>
                    <div className="download-share">
                      <Button
                        className="bg-success text-white"
                        onClick={handleGeneratePDF}
                      >
                        Download PDF
                      </Button>
                      <Button
                        className="bg-danger text-white"
                        onClick={handleGenerateImage}
                      >
                        Download PNG
                      </Button>
                    </div>
                    <div className="download-share">
                      <Button
                        to="/"
                        className="border border-danger bg-white text-danger"
                        onClick={handleNavigate}
                      >
                        Go to home
                      </Button>
                    </div>
                  </>
                </>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignQuotation;
