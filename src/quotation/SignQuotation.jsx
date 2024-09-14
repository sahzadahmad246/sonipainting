import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import "./QuotationReview.css";
import logo from "../images/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getQuotationById } from "../actions/quotationAction";
import Loader from "../Components/header/Loader";
import TakeSign from "./TakeSign";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Select, MenuItem, TextField, Button } from "@mui/material";
import { updateQuotation } from "../actions/quotationAction";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
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

  const now = new Date();
  const formattedDate = format(now, "dd - MMMM - yyyy h:mm a");

  const handleGeneratePDF = () => {
    const input = pdfRef.current;
    setTimeout(() => {
      html2canvas(input, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
        pdf.save("quotation.pdf");
      });
    }, 4000);
  };

  const handleGenerateImage = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "quotation.png";
      link.click();
    });
  };

  const handleWhatsAppShare = () => {
    const clientNumber = `+91${quotation?.client.number}`;
    const message = `Hello ${quotation?.client.name} 😊, greeting from Soni Painting. Here's our quotation, please review and sign it.`;
    const url = `https://sonipainting.com/sign/quotation`;
    const whatsappURL = `https://wa.me/${clientNumber}?text=${encodeURIComponent(
      `${message}\n\n${url}`
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const navigateToTakeSign = () => {
    navigate(`/taking/sign-of/${quotation._id}`);
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
      toast.success("You rejected this quotation");
      console.log("Success:", success);
    }
    if (error) {
      toast.error("Failed to reject this quotation");
      console.log("Error:", error);
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
            {quotation?.clientSignature?.length === 0 &&
              quotation?.status !== "rejected" && (
                <div className="sign-consent">
                  <div className="sign-consent-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="consent" className="ps-2">
                      I have read all the details carefully and I agree with it
                    </label>
                  </div>
                  <button
                    className={`sign-button ${isChecked ? "" : "disabled"}`}
                    disabled={!isChecked}
                    onClick={navigateToTakeSign}
                  >
                    Sign It
                  </button>
                </div>
              )}

            {/* Show reject div if clientSignature is 0 */}
            {quotation?.clientSignature?.length === 0 && (
              <div className="reject">
                <p>Reject</p>
                <div className="rejection-reason">
                  <Select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select a reason
                    </MenuItem>
                    <MenuItem value="Cost">Cost</MenuItem>
                    <MenuItem value="Scope of Work">Scope of Work</MenuItem>
                    <MenuItem value="Quality of Materials">
                      Quality of Materials
                    </MenuItem>
                    <MenuItem value="Timeline">Timeline</MenuItem>
                    <MenuItem value="Previous Experience">
                      Previous Experience
                    </MenuItem>
                    <MenuItem value="Project Requirements">
                      Project Requirements
                    </MenuItem>
                    <MenuItem value="Payment Terms">Payment Terms</MenuItem>
                    <MenuItem value="Contract Terms">Contract Terms</MenuItem>
                    <MenuItem value="Competitor Quotes">
                      Competitor Quotes
                    </MenuItem>
                    <MenuItem value="Permits and Regulations">
                      Permits and Regulations
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {selectedReason === "Other" && (
                    <TextField
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      label="Please specify"
                      fullWidth
                      margin="normal"
                    />
                  )}
                </div>
                <Button
                  variant="contained"
                  color="error"
                  className="reject-button"
                  sx={{ width: "100%", marginY: 2 }}
                  onClick={handleReject}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Reject"
                  )}
                </Button>
              </div>
            )}

            {/* Show you rejected message if clientSignature is greater than 0 and status is rejected */}
            {quotation?.clientSignature?.length > 0 &&
              quotation?.status === "rejected" && (
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
                      disabled={!isChecked}
                      onClick={navigateToTakeSign}
                    >
                      Sign It
                    </button>
                  </div>
                </>
              )}

            {/* Show deal is done and download/share buttons if clientSignature is available */}
            {quotation?.clientSignature?.length > 0 &&
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
                        className="border border-success bg-white text-success"
                        onClick={handleWhatsAppShare}
                      >
                        Share on Whatsapp
                      </Button>
                    </div>
                    <div className="download-share">
                      <Button
                        className="bg-danger text-white"
                        onClick={handleGenerateImage}
                      >
                        Download PNG
                      </Button>
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
