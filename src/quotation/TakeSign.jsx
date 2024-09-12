import React, { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./TakeSign.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSignature } from "../actions/quotationAction";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const TakeSign = () => {
  const signatureRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(
    (state) => state.updatedSignatureData
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Signature updated successfully!");
      navigate(`/sign/quotation/${id}`);
    }
  }, [error, success]);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const saveSignature = async () => {
    if (signatureRef.current.isEmpty()) {
      toast.warn("No signature drawn"); // Display warning notification
      return;
    }

    try {
      const signatureImage = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL(); // Get signature as base64

      // Dispatch the update action with the base64 signature
      await dispatch(updateSignature(id, { signature: signatureImage }));
    } catch (err) {
      console.error(
        "Error converting signature to base64 or dispatching action:",
        err
      );
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
          disabled={loading} // Disable button when loading
        >
          Clear
        </button>

        <button
          className="bg-success text-white"
          onClick={saveSignature}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default TakeSign;
