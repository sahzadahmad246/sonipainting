import React, { useState, useEffect } from "react";
import "./Quotation.css";
import {
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { updateQuotation, getQuotationById } from "../actions/quotationAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_QUOTATION_RESET } from "../constants/quotationConstants";

const UpdateQuotation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, success, error } = useSelector(
    (state) => state.updatedQuotationData
  );
  const { quotation } = useSelector((state) => state.getQuotationById);

  // States
  const [items, setItems] = useState([{ id: Date.now(), description: "", rate: "" }]);
  const [client, setClient] = useState({
    name: "",
    number: "",
    address: "",
  });
  const [discount, setDiscount] = useState({
    type: "amount",
    value: 0,
  });

  // Fetch quotation data
  useEffect(() => {
    if (id) {
      dispatch(getQuotationById(id));
    }
  }, [dispatch, id]);

  // Populate state with fetched quotation data once available
  useEffect(() => {
    if (quotation) {
      setItems(quotation.items || [{ id: Date.now(), description: "", rate: "" }]);
      setClient({
        name: quotation.client?.name || "",
        number: quotation.client?.number || "",
        address: quotation.client?.address || "",
      });
      setDiscount({
        type: quotation.discountType || "amount",
        value: quotation.discountValue || 0,
      });
    }
  }, [quotation]);

  // Handle error and success
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      navigate(`/quotation/review/${quotation._id}`);
      dispatch({ type: UPDATE_QUOTATION_RESET });
    }
  }, [error, success, navigate, dispatch]);

  // Add new item form
  const addItemForm = () => {
    setItems([...items, { id: Date.now(), description: "", rate: "" }]);
  };

  // Remove item form

const removeItemForm = (id) => {
  const updatedItems = items.filter((item) => item.id !== id);

  if (updatedItems.length > 0) {
    setItems(updatedItems);
  } else {
    setItems([{ id: Date.now(), description: "", rate: "" }]);
  }
};


  // Handle form submission
 // Form submission
const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate client details
    if (!client.name || !client.number || !client.address) {
      toast.error("Please fill out all client details.");
      return;
    }
  
    // Validate item details
    for (let item of items) {
      if (!item.description || !item.rate) {
        toast.error("Please fill out all item details.");
        return;
      }
    }
  
    // Calculate subtotal
    const subtotal = items.reduce(
      (total, item) => total + parseFloat(item.rate || 0),
      0
    );
  
    // Calculate discount amount
    let discountAmount = 0;
    if (discount.type === "percent") {
      discountAmount = (discount.value / 100) * subtotal;
    } else {
      discountAmount = parseFloat(discount.value || 0);
    }
  
    // Round the discount and grand total
    discountAmount = Math.round(discountAmount);
    const grandTotal = Math.round(subtotal - discountAmount);
  
    // Prepare form data, ensuring the client details are inside the 'client' object
    const formData = {
      client: {
        name: client.name,
        number: client.number,
        address: client.address,
      },
      items: items.map((item) => ({
        description: item.description,
        rate: item.rate,
      })),
      subtotal: Math.round(subtotal),
      discount: discountAmount,
      grandTotal: grandTotal,
    };
  
    // Dispatch the action to update the quotation
    dispatch(updateQuotation(id, formData));
    
  };
  

  // Handle client input change
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  // Handle item input change
  const handleInputChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Handle discount input change
  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setDiscount({
      ...discount,
      [name]: value,
    });
  };

  // Handle discount type change
  const handleDiscountTypeChange = (event) => {
    setDiscount({
      ...discount,
      type: event.target.value,
      value: 0,
    });
  };

  return (
    <div className="quotation-main">
      <ToastContainer />
      <Typography className="quotation-right-header" variant="outlined">
        Update Quotation
      </Typography>

      {/* Client Details Form */}
      <form className="quotation-form">
        <Typography>Client Details</Typography>
        <div className="quotation-row">
          <TextField
            label="Client Name"
            fullWidth
            margin="normal"
            variant="outlined"
            name="name"
            required
            value={client?.name}
            onChange={handleClientChange}
          />
          <TextField
            label="Client Number"
            fullWidth
            margin="normal"
            variant="outlined"
            name="number"
            required
            value={client.number}
            onChange={handleClientChange}
          />
        </div>
        <TextField
          label="Client Address"
          fullWidth
          margin="normal"
          variant="outlined"
          name="address"
          required
          value={client.address}
          onChange={handleClientChange}
        />
      </form>

      {/* Item Details Forms */}
      <Typography className="item-details">Item Details</Typography>
      {items.map((item) => (
        <form className="quotation-item" key={item.id}>
          <TextField
            label="Item Description"
            fullWidth
            margin="normal"
            variant="outlined"
            className="item-description"
            required
            value={item.description}
            onChange={(e) =>
              handleInputChange(item.id, "description", e.target.value)
            }
          />
          <TextField
            label="Rate"
            type="number"
            margin="normal"
            variant="outlined"
            required
            className="item-rate"
            value={item.rate}
            onChange={(e) => handleInputChange(item.id, "rate", e.target.value)}
            InputProps={{ inputProps: { min: 0 } }} // Ensuring minimum value is 0
          />
          <button
            type="button"
            onClick={() => removeItemForm(item.id)}
            className="remove-button"
          >
            Remove Item
          </button>
        </form>
      ))}

      {/* Discount Section */}
      <Typography className="item-details">Discount</Typography>
      <div className="discount-details">
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Discount Type</InputLabel>
          <Select
            label="Discount Type"
            value={discount.type}
            onChange={handleDiscountTypeChange}
          >
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="percent">Percent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Discount Value"
          type="number"
          margin="normal"
          variant="outlined"
          name="value"
          value={discount.value}
          onChange={handleDiscountChange}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>

      <div className="quote-button">
        <button onClick={addItemForm} className="item-button">
          Add Another Item
        </button>

        <button onClick={handleSubmit} className="quotation-button">
          {loading ? <CircularProgress size={24} /> : "Update Quotation"}
        </button>
      </div>
    </div>
  );
};

export default UpdateQuotation;
