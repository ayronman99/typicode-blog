import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, Modal, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import zustStore from '../contexts/zustStore';


import { Link } from 'react-router-dom';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function PostCards({ userId, id, title, body }: TypiCodeSchema) {

    return (
        <Grid item xs={12} sm={6} lg={3} className='flex justify-center'>

            <Card sx={{ maxWidth: 345 }} className="h-full transition-all duration-300 ease-in hover:cursor-pointer hover:scale-110">
                <Link to={`/post/${id}`}>
                    <CardMedia
                        component='img'
                        image="https://source.unsplash.com/random/"
                        title="green iguana"
                    />
                    <CardContent className="min-h-[228px]">
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {body}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>       
        </Grid >


    )
}

export default PostCards;
