import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Animations from '../../components/Animations';

const Login = () => {
    const[animation, ] = React.useState(Animations)
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { name, password });
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
                    <Typography variant="h5" align="center" gutterBottom>
                    {animation}
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPass ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

