import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./TakeSign.css";
import { useDispatch } from "react-redux";
import { updateQuotation } from "../actions/quotationAction";
import { useParams } from "react-router-dom";

const TakeSign = () => {
  const signatureRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the id from params

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const saveSignature = async () => {
    if (signatureRef.current.isEmpty()) {
      console.log("No signature drawn");
      return;
    }

    try {
      const signatureImage = signatureRef.current.getTrimmedCanvas().toDataURL(); // Get signature data URL

      // Convert base64 to Blob
      const response = await fetch(signatureImage);
      const blob = await response.blob();
      const file = new File([blob], "signature.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("signature", file);

      // Debugging FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Dispatch the update action
      await dispatch(updateQuotation(id, formData));
      console.log("Signature saved and dispatched successfully.");
    } catch (err) {
      console.error("Error converting signature to file or dispatching action:", err);
    }
  };

  return (
    <div className="signature-container">
      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          className: "signature-canvas",
        }}
      />
      <div className="take-sign-button">
        <button
          className="border border-success text-success"
          onClick={clearSignature}
        >
          Clear
        </button>
        <button className="bg-success text-white" onClick={saveSignature}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TakeSign;
