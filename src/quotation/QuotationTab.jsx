import React, { useState } from "react";
import "./QuotationTab.css";
import Quotation from "../quotation/Quotation";
import { GeneratedQuotation } from "./GeneratedQuotation";

const QuotationTab = () => {
  // useState to track which component to render
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="quotationTab">
      <div className="buttonContainer">
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create Quotation
        </button>
        <button
          className={activeTab === "manage" ? "active" : ""}
          onClick={() => setActiveTab("manage")}
        >
          Manage Quotation
        </button>
      </div>

      <div className="contentContainer">
        {activeTab === "create" ? (
          <Quotation />
        ) : (
          <GeneratedQuotation />
        )}
      </div>
    </div>
  );
};

export default QuotationTab;
