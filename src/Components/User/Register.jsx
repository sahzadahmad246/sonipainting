import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Register.css";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)({
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  margin: "auto",
  marginTop: "5rem",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

const StyledLink = styled(Button)({
  marginTop: "1rem",
  textTransform: "none",
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // use this for navigation
  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);

    dispatch(registerUser(formData));
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-main">
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={3}>
          <Typography variant="h5">Register</Typography>
          <form onSubmit={handleRegister} noValidate style={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Sign up"
              )}
            </StyledButton>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Already have an account?
              <Button color="primary" onClick={handleLoginRedirect}>
               Login
              </Button>
            </Typography>
          </form>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Registration;