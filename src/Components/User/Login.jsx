import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom"; // for navigation
import { loadUser } from "../../actions/userAction";
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // use this for navigation
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ phoneNumber, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      dispatch(loadUser());
    }
    if (error) {
      navigate("/login");
    }
  }, [isAuthenticated, error]);
  const handleSignUpRedirect = () => {
    navigate("/register"); // redirect to register page
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin} noValidate style={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            autoFocus
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
            autoComplete="current-password"
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
              "Login"
            )}
          </StyledButton>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </form>

        {/* New to here? Sign up link */}
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          New here?{" "}
          <Button color="primary" onClick={handleSignUpRedirect}>
            Sign up
          </Button>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default Login;
