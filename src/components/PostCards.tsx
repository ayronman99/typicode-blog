import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';


import { Link } from 'react-router-dom';

function PostCards({ id, title, body }: Partial<TypiCodeSchema>) {

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
