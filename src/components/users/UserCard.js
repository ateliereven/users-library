import React from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link as Anchor } from '@mui/material';
import { IconButton, CardActionArea, CardActions, Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

import cardStyles from "../../css/UserCard.module.css";

const UserCard = ({ id, name: {title, first, last}, email, image, location: {country, city, street:{name, number}} }) => {
    return <Grid item  xs={12} md={6} lg={4}>
        <Card elevation={3} sx={{maxWidth: '400px'}}>
            <CardActionArea className={cardStyles.images}>
                {image ?
                    <CardMedia
                        component='img'
                        height='100'
                        image={image}
                        alt="my user pic"
                    /> 
                    : <Typography className={cardStyles.iconContainer} >
                        <AccountCircleSharpIcon fontSize="" className={cardStyles.icon} />
                        </Typography>
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${title} ${first} ${last}`}
                    </Typography>
                    <Typography variant="body" color="text.secondary" gutterBottom={true} className={cardStyles.iconContainer}>
                        <MailIcon sx={{ marginRight: '5px' }} />
                        <Anchor href={`mailto:${email}`} color="inherit" underline="hover"
                        >
                            {email}
                        </Anchor>
                    </Typography>
                    <Typography variant="body" color="text.secondary" gutterBottom={true} className={cardStyles.iconContainer}>
                        <LocationOnIcon sx={{ marginRight: '5px' }}/>
                        {`${country}, ${city}, ${number} ${name}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ borderTop: 'solid 1px #eee' }}>
                <Link to={`/user/edit/${id}`}><IconButton aria-label="edit" sx={{ backgroundColor: '#f8f8f8'}}>
                    <EditIcon color="primary" fontSize="large"/>
                    </IconButton> </Link>
                <Link to={`/user/delete/${id}`}><IconButton aria-label="delete" sx={{ backgroundColor: '#f8f8f8' }}>
                    <DeleteIcon color="error" fontSize="large"/>
                    </IconButton> </Link>
                    <Box sx={{ flexGrow: 1 }} />
                <Typography variant="body" color="text.secondary" className={cardStyles.iconContainer}>
                    <PersonIcon color="primary" fontSize="small" />
                        {id}
                    </Typography>
            </CardActions>
        </Card>
    </Grid>
}

export default UserCard;