import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// Modal style:
const BootstrapModal = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

// Modal title: 
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Modal = props => {
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return ReactDOM.createPortal(
        <BootstrapModal
        //  fullScreen={fullScreen}
            onClose={props.onDismiss}
            aria-labelledby="customized-dialog-title"
            open={true}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={props.onDismiss}>
                {props.title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom component='div'>
                    {props.content}
                </Typography>
            </DialogContent>
            {props.actions && <DialogActions>
                {props.actions}
            </DialogActions>}
        </BootstrapModal>,
        document.querySelector('#modal')
    )
}

export default Modal;