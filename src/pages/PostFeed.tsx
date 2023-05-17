import { useState, useContext } from 'react'
import { ContextPost } from '../contexts/PostContexts'
import { Alert, Box, Button, Container, Divider, FormControl, Grid, IconButton, InputBase, Modal, Paper, Snackbar, TextField, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import PostCards from '../components/PostCards';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import zustStore from '../contexts/zustStore';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function PostFeed() {
    const postsData = zustStore(state => state.postData);
    const addPost = zustStore(state => state.addPost);
    
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const [snackState, setSnackState] = useState(false);
    const [createTitle, setCreateTitle] = useState("");
    const [createContent, setCreateContent] = useState("");
    const [filterPosts, setFilterPosts] = useState("");

    const closeCreatePost = () => setOpenCreatePost(false);
    const closeSnack = () => setSnackState(false);

    const createPost = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (createTitle && createContent) {
            await axios.post("https://jsonplaceholder.typicode.com/posts", {
                title: createTitle,
                body: createContent,
                userId: 10
            })
                .then(res => addPost(res.data))
            setOpenCreatePost(false)
            setSnackState(true)
            setCreateTitle("")
            setCreateContent("")
        } else {
            alert("Please fill out both title and content")
        }
    }

    // const filteredPosts = postsData.filter((fPosts) => !filterPosts ? fPosts : fPosts.title.toLowerCase().includes(filterPosts.toLowerCase()));
    const filteredPosts = postsData.filter((fPosts) => fPosts.title.toLowerCase().includes(filterPosts.toLowerCase()));

    console.log(filteredPosts, filterPosts)
    return (
        <div>
            <NavBar />

            <Container maxWidth="xl" className="flex justify-center pt-5 min-h-screen">
                <div className="p-2 flex justify-between sm:justify-around rounded-md">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Media Posts"
                            inputProps={{ 'aria-label': 'search posts' }}
                            value={filterPosts}
                            onChange={(evt) => setFilterPosts(evt.target.value)}
                        />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    </Paper>
                    <Button className="float-right" size="small" color="warning" variant="contained" onClick={() => setOpenCreatePost(true)}><AddIcon /></Button>
                </div>
                <div className="flex justify-center">

                    <Grid container justifyContent="center" spacing={{ xs: 2, sm: 3 }} className="">
                        {filteredPosts?.map((items) => {
                            return <PostCards key={items.id}
                                userId={items.userId}
                                id={items.id}
                                title={items.title}
                                body={items.body}
                            />
                        })}

                    </Grid>
                </div>

                <Modal
                    open={openCreatePost}
                    onClose={closeCreatePost}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box component="form" sx={style} onSubmit={createPost}>
                        <FormControl variant="outlined" className='w-full'>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Title
                            </Typography>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                maxRows={1}
                                value={createTitle}
                                onChange={e => setCreateTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl variant="outlined" className='w-full'>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Content
                            </Typography>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                maxRows={7}
                                value={createContent}
                                onChange={e => setCreateContent(e.target.value)}
                            />
                        </FormControl>
                        <Box component="div" className="flex justify-between p-1">
                            <Button type="submit" size='small' variant='contained' color='info' disabled={!createTitle || !createContent}>Add Post</Button>
                            <Button size='small' variant='outlined' onClick={closeCreatePost}>Close</Button>
                        </Box>
                    </Box>

                </Modal>

                <Snackbar open={snackState} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={closeSnack}>
                    <Alert onClose={closeSnack} severity="success" sx={{ width: '100%' }}>
                        Post Added!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default PostFeed