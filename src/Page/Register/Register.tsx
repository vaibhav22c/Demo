import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { registerUser, signIn } from "../../firebase/auth.ts";
import { useUserContext } from "../../context/provider.tsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const { updateData }: any = useUserContext();

  const handleSubmit = async (event) => {
    // user can register from here 
    // name, email and password and role are required***

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body: any = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      role: data.get('role')
    };
    try {
      if (body && body.email !== '' && body.email !== '') {
        registerUser(body).then((res) => {
          if (res) {
            updateData(res);
            navigate('/board')
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
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>
          <Typography component="h1" variant="h5">Register</Typography>
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                label="Role"
              >
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'staff'}>Staff</MenuItem>
                <MenuItem value={'viewer'}>Viewer</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          <span onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign in</span>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
