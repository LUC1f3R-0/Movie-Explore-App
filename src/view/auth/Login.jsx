import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import Animations from '../../components/Animations';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const loginAuth = {
        userName: 'admin',
        password: 'admin000'
    }

    // const [animation,] = React.useState(Animations)
    const [showPass, setShowPass] = React.useState(false);
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setsError] = React.useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        if (!name.trim() || !password.trim()) {
            setsError(true)
        } else if (name === loginAuth.userName && password === loginAuth.password) {
            Swal.fire({
                title: "Login Success",
                icon: "success",
                draggable: true
            });
            localStorage.setItem('login', true)
            React.startTransition(() => {
                navigate('/movies')
            });
        } else {
            Swal.fire({
                title: "Invalid",
                icon: "error",
                draggable: true
            });
        }
    };

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Card sx={{ width: 500, padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" align="center" >
                        {/* {animation} */}
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setsError(false) }}
                        />
                        {error && (<Typography color="error" sx={{ fontWeight: 'bold' }}>
                            *Input Name
                        </Typography>)}
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPass ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setsError(false) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && <Typography color="error" sx={{ fontWeight: 'bold' }}>
                            *input Password
                        </Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;

