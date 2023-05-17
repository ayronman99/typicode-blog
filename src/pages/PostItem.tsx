import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, CardHeader, Paper, Tooltip, Alert, Box, Button, Card, CardContent, CardMedia, FormControl, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import zustStore from '../contexts/zustStore';

//MUI BELOW
import Avatar from '@mui/material/Avatar';
import Container from "@mui/material/Container";

function PostItem() {
    const { id } = useParams();
    const navigator = useNavigate();

    //State and Mutators from zustand
    const postsData = zustStore(state => state.postData);
    const postsUser = zustStore(state => state.postUsers);
    const updatePostHandler = zustStore(state => state.updatePost);
    const deletePostHandler = zustStore(state => state.deletePost);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackSeverity, setSnackSeverity] = useState(false);
    const [initEditPost, setInitEditPost] = useState(false);

    const intID = Number(id);


    const thisPostData = postsData?.filter(post => post.id === intID);
    const thisPostUser = postsUser?.filter(user => user.id === postsData[0]?.userId);

    const [updTitle, setUpdTitle] = useState(thisPostData[0].title);
    const [updContent, setUpdContent] = useState(thisPostData[0].body);

    console.log(thisPostData, thisPostUser, "should return user and the post")

    const handleSnackClose = () => setOpenSnack(false);

    const updatePost = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: updTitle,
            body: updContent
        })
            .then(res => updatePostHandler(res.data.id, res.data.title, res.data.body))
        setOpenSnack(true)
        setSnackSeverity(true)
        setInitEditPost(false)
    }

    const deletePost = (thisId: number, evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.stopPropagation();
        setOpenSnack(true)
        deletePostHandler(thisId)
        navigator("/feed")
    }

    return (
        <Container maxWidth="lg" sx={{ paddingY: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", minHeight: "100vh" }}>

            <Breadcrumbs aria-label="breadcrumb" className="float-start w-full">
                <Link to="/feed">
                    Posts
                </Link>
                <Typography>
                    {id}
                </Typography>
            </Breadcrumbs>

            <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: { xs: 5, md: 0 } }}>
                <Grid item xs={12} md={8} lg={10}>
                    <Paper elevation={6}>
                        <Card sx={{ boxShadow: "none" }}>
                            <CardHeader
                                avatar={
                                    <Tooltip title={thisPostUser[0].name ?? "I am Mario"} placement="top-start">
                                        <Avatar alt={thisPostUser[0].name ?? "I am Mario"} src="https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-260nw-1681253560.jpg" />
                                    </Tooltip>
                                }
                                title={thisPostUser[0].name ?? "I am Mario"}
                            />

                            <CardMedia
                                component='img'
                                sx={{ objectFit: "cover", paddingX: 1 }}
                                height="400"
                                image="https://source.unsplash.com/random/"
                            />
                            <CardContent sx={{ padding: 1 }}>
                                {!initEditPost ?
                                    <>
                                        <Typography variant="subtitle1" sx={{ fontSize: "1.5rem" }} gutterBottom>
                                            {thisPostData && thisPostData[0].title}
                                        </Typography>
                                        <Typography gutterBottom>
                                            {thisPostData && thisPostData[0].body}
                                        </Typography>
                                    </>
                                    :
                                    <Box component="form" onSubmit={updatePost} >
                                        <FormControl variant="outlined" className='w-full'>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Title
                                            </Typography>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                maxRows={1}
                                                value={updTitle}
                                                onChange={e => setUpdTitle(e.target.value)}
                                            />
                                        </FormControl>

                                        <FormControl variant="outlined" className='w-full'>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Content
                                            </Typography>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                minRows={5}
                                                maxRows={7}
                                                value={updContent}
                                                onChange={e => setUpdContent(e.target.value)}
                                            />
                                        </FormControl>
                                        <div className='p-2 flex justify-center items-center'>
                                            <Button type="submit" variant='contained'>Update</Button>
                                            <Button type="button" onClick={() => setInitEditPost(false)}>Cancel</Button>
                                        </div>
                                    </Box>
                                }
                                {
                                    initEditPost ?
                                        <></>
                                        :
                                        <Box
                                            component="div"
                                            className='flex justify-end'
                                        >
                                            <Button type='button' variant='contained' sx={{ marginRight: 2 }} onClick={() => setInitEditPost(true)}>Edit</Button>
                                            <Button type='button' variant='outlined' color='error' onClick={(e) => deletePost(intID, e)}>Delete</Button>
                                        </Box>

                                }

                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>

            </Grid>

            <Snackbar open={openSnack} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={!snackSeverity ? "error" : "success"} sx={{ width: '100%' }}>
                    {!snackSeverity ? "Post Deleted." : "  Post Updated Successfully!"}
                </Alert>
            </Snackbar>
        </Container >
    )

}

export default PostItem;




