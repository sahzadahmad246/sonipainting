import React, { useRef } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import "./QuotationReview.css";
import logo from "../images/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { GoDownload } from "react-icons/go";

const QuotationReview = () => {
  const { data } = useSelector((state) => state.quotationData);
  const pdfRef = useRef();

  // Get current date and time
  const now = new Date();
  const formattedDate = format(now, "dd - MMMM - yyyy h:mm a");

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
    const clientNumber = `+91${data.client.number}`;
    const message = `Hello ${data.client.name} 😊, greeting from Soni Painting. Here's our quotation, please review and sign it.`;
    const url = `https://sonipainting.com/sign/thequotation`;
    
    const whatsappURL = `https://wa.me/${clientNumber}?text=${encodeURIComponent(
      `${message}\n\n${url}`
    )}`;
    
    window.open(whatsappURL, "_blank");
};

  return (
    <div className="review-main">
      <div ref={pdfRef} className="quotation-content">
        <div className="company-details">
          <div className="company-details-1">
            <img src={logo} alt="Company Logo" />
            <p>Soni Painting</p>
          </div>
          <div className="company-details-left">
            <div className="whatsapp-box">
              <FaWhatsapp className="whatsapp-icon" />
              <div className="ps-1 whatsapp-number">9022846640</div>
            </div>
            <div className="call-box">
              <IoIosCall className="call-icon" />
              <div className="ps-1 call-number">8452085416</div>
            </div>
          </div>
        </div>
        <div className="company-address text-center">
          <span>
            Hiranandani Estate, Patlipada, Ghodbunder Road Thane West- 400607
          </span>
        </div>
        <div className="blue-line">
          <span className="line"></span>
          <span className="px-2">Quotation</span>
          <span className="line"></span>
        </div>
        <div className="client-details-boxes">
          <div className="client-details-box">
            <span>Quotation No: 10001</span>
            <span>Date: {formattedDate}</span>
          </div>
          <div className="client-details-box">
            <span>Client Name: {data.client.name}</span>
            <span>Client No: {data.client.number}</span>
          </div>
          <div className="client-details-box1 ps-0.5">
            <span>Address: {data.client.address}</span>
          </div>
        </div>
        <div className="gray-line"></div>
        <div className="item-box">
          <div className="item-header">
            <span className="sr-no">Sr No.</span>
            <span className="description">Description</span>
            <span className="rate">Rate</span>
          </div>
          {data.items.map((item, index) => (
            <div key={index} className="item-content">
              <span className="sr-no">{index + 1}.</span>
              <span className="description">{item.description}</span>
              <span className="rate">₹{item.rate}</span>
            </div>
          ))}
        </div>
        <div className="total-main">
          <div className="item-total">
            <span className="null-space"></span>
            <span className="field-name">Subtotal</span>
            <span className="field-value">₹{data.subtotal}</span>
          </div>
          <div className="item-total">
            <span className="null-space"></span>
            <span className="field-name">Discount</span>
            <span className="field-value">₹{data.discount}</span>
          </div>
          <div className="item-total">
            <span className="null-space"></span>
            <span className="field-name">Grand Total</span>
            <span className="field-value">₹{data.grandTotal}</span>
          </div>
        </div>
        <div className="term-and-condition">
          <h5>Term & Condition</h5>
          <span>
            1. Any additional work requested by the customer that is not
            included in the original scope of work will be priced separately and
            agreed upon in writing before proceeding.
          </span>
          <span>
            2. The SONI PAINTING WORKS will be responsible for thoroughly
            cleaning the work area after completion, leaving no mess or debris
            behind.
          </span>
          <span>
            3. We will provide regular updates on progress and will communicate
            any delays or changes to the timeline in a timely manner.
          </span>
          <span>
            4. By signing this document, you agree with our terms and
            conditions.
          </span>
        </div>
        <div className="signature-box">
          <div className="soni-sign">
            <img src="" alt="sign" />
            <span>for SONI PAINTING</span>
          </div>
          <div className="client-sign">
            <img src="" alt="sign" />
            <span>for {data.client.name}</span>
          </div>
        </div>
      </div>
      <div className="action-button ">
        <button className="bg-success text-white" onClick={handleGeneratePDF}>
          <GoDownload size={20}/> Download PDF
        </button>
        <button className="border border-success bg-white text-success" onClick={handleWhatsAppShare}>
          Share on <FaWhatsapp size={20}/>
        </button>
      </div>
    </div>
  );
};

export default QuotationReview;
