import React from "react";
import { Field, Form } from 'react-final-form';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Grid, Button, TextField, Box } from '@mui/material';

const UserForm = (props) => {

    // Get list of existing email addresses of current users:
    const userEmails = useSelector(state => state.map(user => user.email));

    // email validation:
    const validateEmails = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email) === false) return 'Please enter a valid email address';
        // make sure email doesn't already exist (unless editing a user and it's the user's current email address)
        if (userEmails.includes(email)) {
            if (props.email && props.email === email) return;
            else return 'Email already exists in library';
        }
    }

    // the form field attributes:
    const FIELDS = {
        title: { label: "Title",name: "title" },
        first: { label: "First name", name: "first" },
        last: {label: "Last name",name: "last"},
        email: {label: "Enter Email", name: "email"},
        country: {label: "Country", name: "country"},
        city: {label: "City", name: "city"},
        street: {label: "Street", name: "street"},
        number: {label: "Street Number", name: "number"}
    };

    //Return an input element to the component prop, and hook it with relevant properties deconstructed from formProps:  
    const renderInput = ({ input, label, meta }) => {
        return (
            <TextField
                required
                label={label}
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                error={meta.error && meta.touched ? true : false} // style as error
                helperText={meta.error && meta.touched ? `${meta.error}` : ''} // Display an error message

            />
        );
    }

    // Whenever the user submits the form the inputs are validated. 
    // If they are valid onSubmit callback is called from the parent component and all form values are dispatched
    const onSubmit = (formValues) => {
        //console.log(formValues)
        props.onSubmit(formValues)
    }

    return (
        <Form
            // for when editing an existing record:
            initialValues={props.initialValues}
            onSubmit={onSubmit}
            //validation:
            validate={(formValues) => {
                const errors = {}
                //if no emails have been entered provide an empty string. if there are emails run the function:
                errors.email = validateEmails(formValues.email || '');
                // to get a customised error message for each field:
                for (let field in FIELDS) {
                    if (!formValues[field] && FIELDS[field].label && FIELDS[field].label !== "Enter Email") {
                        errors[field] = `Please enter ${FIELDS[field].label.toLowerCase()}`
                    }
                }
                // 3 characters min per name:
                if (formValues.first && formValues.first.length < 3) {
                    errors.first = 'Name must be at least 3 characters long'
                }
                return errors;
            }}

            render={({ handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                    <Box sx={{'& .MuiTextField-root': { m: 1, width: '95%' }}} >
                        <Grid container alignItems="flex-start">
                            <Typography variant="subtitle1" gutterBottom component="label" sx={{ pb: 1 }}>
                                Enter full name:
                            </Typography>

                            <Grid item xs={12}>
                                
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.title.name}
                                    component={renderInput}
                                    label={FIELDS.title.label}
                                />

                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.first.name}
                                    component={renderInput}
                                    label={FIELDS.first.label}
                                />
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.last.name}
                                    component={renderInput}
                                    label={FIELDS.last.label}

                                />
                            </Grid>
                            <Grid item xs={12} sx={{ py: 1.5 }}>
                                <Field
                                    fullWidth
                                    required
                                    type="email"
                                    name={FIELDS.email.name}
                                    component={renderInput}
                                    label={FIELDS.email.label}
                                />
                            </Grid>
                            <Typography variant="subtitle1" gutterBottom component="label" sx={{ py: 1 }}>
                                Enter full address:
                            </Typography>
                            <Grid item xs={12}>
                                
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.country.name}
                                    component={renderInput}
                                    label={FIELDS.country.label}
                                />
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.city.name}
                                    component={renderInput}
                                    label={FIELDS.city.label}
                                />
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.street.name}
                                    component={renderInput}
                                    label={FIELDS.street.label}
                                />
                                <Field
                                    fullWidth
                                    required
                                    name={FIELDS.number.name}
                                    component={renderInput}
                                    label={FIELDS.number.label}
                                />
                            </Grid>
                            <Grid container item sx={{ py: 1, justifyContent: 'flex-end' }} xs={12}>
                                <Link to='/'>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: (theme) => theme.palette.grey[400], mr: 2 }}
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={submitting}
                                >
                                    {props.isAdd ? 'Add' : 'Save'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            )}

        />
    )
}

export default UserForm;