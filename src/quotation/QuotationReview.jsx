import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import "./QuotationReview.css";


import { GoDownload } from "react-icons/go";
import { getQuotationById } from "../actions/quotationAction";
import { useParams } from "react-router-dom";
import Loader from "../Components/header/Loader";
import Alert from "@mui/material/Alert";
import PdfPreview from "./PDFPreview";
const QuotationReview = () => {
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, quotation, error } = useSelector(
    (state) => state.getQuotationById
  );
  // Get current date and time
  const now = new Date();
  const formattedDate = format(now, "dd - MMMM - yyyy h:mm a");

  useEffect(() => {
    if (id) {
      dispatch(getQuotationById(id));
    }
  }, [dispatch, id]);

  const handleGeneratePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
      pdf.save("quotation.pdf");
    });
  };

  const handleWhatsAppShare = () => {
    if (quotation) {
      const clientNumber = `+91${quotation.client.number}`;
      const message = `Hello ${quotation.client.name} 😊, greeting from Soni Painting. Here's our quotation, please review and sign it.`;
      const url = `https://sonipainting.com/sign/quotation/${quotation._id}`;

      const whatsappURL = `https://wa.me/${clientNumber}?text=${encodeURIComponent(
        `${message}\n\n${url}`
      )}`;

      window.open(whatsappURL, "_blank");
    }
  };

  return (
    <>
      <div className="alert">
        {quotation === null ? (
          <Alert severity="error">{error}, try again</Alert>
        ) : null}
      </div>
      <div className="review-main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <PdfPreview
              pdfRef={pdfRef}
              quotation={quotation}
              formattedDate={formattedDate}
            />
            <div className="action-button ">
              <div className="download-share">
                <button
                  className="bg-success text-white"
                  onClick={handleGeneratePDF}
                >
                  Download PDF
                </button>
                <button
                  className="border border-success bg-white text-success"
                  onClick={handleWhatsAppShare}
                >
                  Share on Whatsapp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuotationReview;
