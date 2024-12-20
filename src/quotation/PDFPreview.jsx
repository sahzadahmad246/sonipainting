import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import logo from "../images/logo.png";
import omSign from "../images/omSign.png";
import "./QuotationReview.css";

const PdfPreview = ({ pdfRef, quotation, formattedDate }) => {
  return (
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
          <span>Q. Id: #{quotation?._id}</span>
          <span>Date: {formattedDate}</span>
        </div>
        <div className="client-details-box">
          <span>Client Name: {quotation?.client.name}</span>
          <span>Client No: {quotation?.client.number}</span>
        </div>
        <div className="client-details-box1 ">
          <span>Address: {quotation?.client.address}</span>
        </div>
      </div>
      <div className="gray-line"></div>
      <div className="item-box">
        <div className="item-header">
          <span className="sr-no">Sr No.</span>
          <span className="description">Description</span>
          <span className="rate">Rate</span>
        </div>
        {quotation?.items.map((item, index) => (
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
          <span className="field-value">₹{quotation?.subtotal}</span>
        </div>
        {quotation?.discount ? (
          <div className="item-total">
            <span className="null-space"></span>
            <span className="field-name">Discount</span>
            <span className="field-value">₹{quotation.discount}</span>
          </div>
        ) : null}

        <div className="item-total">
          <span className="null-space"></span>
          <span className="field-name">Grand Total</span>
          <span className="field-value">₹{quotation?.grandTotal}</span>
        </div>
      </div>
      <div className="term-and-condition">
        <h5>Term & Condition</h5>
        <span>
          1. Our payment terms are 25% in advance to start the work. 50% payment
          is due after 50% of the work is completed, totaling 75%. The remaining
          25% is due upon project completion.
        </span>
        <span>
          2. Any additional work requested by the customer that is not included
          in the original scope of work will be priced separately and agreed
          upon in writing before proceeding.
        </span>
        <span>
          3. The SONI PAINTING WORKS will be responsible for thoroughly cleaning
          the work area after completion, leaving no mess or debris behind.
        </span>
        <span>
          4. We will provide regular updates on progress and will communicate
          any delays or changes to the timeline in a timely manner.
        </span>
        <span>
          5. By signing this document, you agree with our terms and conditions.
        </span>
      </div>
      <div className="signature-box">
        <div className="client-sign"></div>
        <div className="soni-sign">
          <img src={omSign} alt="sign" />
          <span>for SONI PAINTING</span>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
