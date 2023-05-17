
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Button } from '@mui/material'
import { Link } from "react-router-dom";
import BlogPng from "../assets/blogger.png"


function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const emailCheck = emailRegex.test(emailContent);

    return (
        <div>
            <Grid container className='relative min-h-screen w-screen'>
                <Grid item xs={12} sm={6}>
                    <div className="absolute z-0 sm:relative flex w-full sm:w-inherit flex-col justify-center items-center bg-[#25515c] h-full">
                        <img className="object-contain h-[300px] w-[300px]" src={BlogPng} alt="Bloggers Logo" />
                        <p className="text-6xl font-semibold text-slate-300">Blogger</p>
                        <p className="text-xl font-semibold text-slate-300 mt-2">Beyond Bloggering</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box component="form" className="flex justify-center items-center h-full">
                        <Box component="div" id="creds-container" className="absolute -translate-y-3/4 sm:relative sm:translate-y-0 flex flex-col justify-around items-stretch w-2/4 p-5 rounded-lg drop-shadow-lg bg-gray-100 border-1 border-emerald-700">
                            <h2 className="text-3xl font-bold my-5">Sign In</h2>

                            <div className="flex flex-col justify-around">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="mmi-email">Email</InputLabel>
                                    <OutlinedInput
                                        id="mmi-email"
                                        type="email"
                                        label="Password"
                                        value={emailContent}
                                        onChange={e => setEmailContent(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl sx={{ marginTop: 2 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        required={true}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div className="p-2">
                                <Button disabled={!emailCheck} className="float-right" variant="contained">
                                    <Link to="/feed" className="text-white">
                                        Sign In
                                    </Link>
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home