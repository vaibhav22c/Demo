import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../firebase/auth.ts";
import { useUserContext } from "../../context/provider.tsx";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  // get login userdata from user provider context 
  const { updateData }: any = useUserContext();


  const handleSubmit = async (event) => {
    // user can login from here 
    // email and password are required***

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body: any = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      if (body && body.email !== '' && body.email !== '') {
        signIn(body).then((res) => {
          updateData({ email: res?.user?.email, id: res?.user?.uid });
          navigate('/board')
        })
      } else {
        alert("Some field are missing")
      }
    } catch (error) {
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>
          <Typography component="h1" variant="h5">
            {" "}
            Sign in{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign In</Button>
            <Button onClick={() => navigate('/register')} fullWidth variant="contained">Register</Button>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="right"
          sx={{ mt: 1 }}
        >
          <span onClick={() => navigate('/reset-password')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Reset Password</span>
        </Typography>

      </Container>
    </ThemeProvider>
  );
}
