import React, { useState } from "react";
import "./Quotation.css";
import {
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { saveQuotationData } from "../actions/quotationAction";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Quotation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: Date.now(), description: "", rate: "" },
  ]);
  const [client, setClient] = useState({
    name: "",
    number: "",
    address: "",
  });
  const [discount, setDiscount] = useState({
    type: "amount", // 'amount' or 'percent'
    value: 0,
  });

  // Add new item form
  const addItemForm = () => {
    setItems([...items, { id: Date.now(), description: "", rate: "" }]);
  };

  // Remove item form
  const removeItemForm = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const subtotal = items.reduce(
      (total, item) => total + parseFloat(item.rate || 0),
      0
    );
  
    let discountAmount = 0;
    if (discount.type === "percent") {
      discountAmount = (discount.value / 100) * subtotal;
    } else {
      discountAmount = parseFloat(discount.value || 0);
    }
  
    // Round the discount and grand total
    discountAmount = Math.round(discountAmount);
    const grandTotal = Math.round(subtotal - discountAmount);
  
    const formData = {
      client: client,
      items: items.map((item) => ({
        description: item.description,
        rate: item.rate,
      })),
      subtotal: Math.round(subtotal),
      discount: discountAmount,
      grandTotal: grandTotal,
    };
  
    dispatch(saveQuotationData(formData));
    navigate("/quotation/review");
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
      <Typography className="quotation-right-header" variant="outlined">
        Make a Quotation
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
            value={client.name}
            onChange={handleClientChange}
          />
          <TextField
            label="Client Number"
            fullWidth
            margin="normal"
            variant="outlined"
            name="number"
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
          Submit Quotation
        </button>
      </div>
    </div>
  );
};

export default Quotation;
