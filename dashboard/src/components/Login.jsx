import {React,useState} from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AuthService from "./authService";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
  
    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error('Invalid email address');
      return;
    }
  
    if (password.length < 4) {
      setPasswordError(true);
      toast.error('Password should be at least 4 characters long');
      return;
    }
  
    if (email && password) {
      try {
        await AuthService.login(email, password).then(
          () => {
            navigate("/charts");
          },
          (error) => {
            toast.error('Incorrect email or password');
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <LockIcon fontSize="large" />
            <Typography variant="h5" component="h1">
              Sign in
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            fullWidth
            value={email}
            error={emailError} 
            label="Email Address"/>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            label="Password"
            fullWidth 
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />
          </Grid>
          <Grid item xs={12}>
            <Button className="login-button"  variant="contained" color="primary" fullWidth type="submit">
              Sign in
            </Button>
          </Grid>
          <Grid item xs={12}  textAlign="center">
            <Typography variant="body2" color="textSecondary">
              &copy; Your Website 2023
            </Typography>
          </Grid>
        </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

