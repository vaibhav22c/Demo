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
import { sendResetPassMail, signIn } from "../../firebase/auth.ts";
import { toast } from "react-toastify";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // user get reset password link into mail from here 
    // email are required***

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body: any = {
      email: data.get("email"),
    };
    try {
      if (body && body.email !== '' && body.email !== '') {
        sendResetPassMail({ ...body, navigate }).then((res) => {
          if (res) {
            toast('reset password link sent on email.', { type: 'success' })
          }
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Reset Password</Typography>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              send mail
            </Button>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          <span onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign in</span>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
