import React from "react";
import { Field, Form } from 'react-final-form';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Grid, Button, TextField, Box } from '@mui/material';

import FIELDS from "./formFields";

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

    // create form fields:
    const renderFields = (fields) => {
        return fields.map((field) => {
            return (
                <Field
                    fullWidth
                    required
                    name={field.name}
                    component={renderInput}
                    label={field.label}
                    key={field.label}
                />
            )
        })
    }

    //Return an input element to the component prop of Field, and hook it with relevant properties deconstructed from formProps:  
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
                const errors = {name:{}, location:{street:{}}}
                //if no emails have been entered provide an empty string. if there are emails run the function:
                errors.email = validateEmails(formValues.email || '');

                // to get a customised error message for each field (should have used a general function for all, nested objects created a challenge):
                FIELDS.forEach(({ name, label }) => {
                    //console.log(formValues[name]) - returns undefined...
                    if (!formValues[name] && formValues[label]) {
                        errors[name] = `Please enter ${label.toLowerCase()}`
                    }
                })

                if (!formValues.name?.title) {
                    errors.name.title = 'Please enter title'
                }
                if (!formValues.name?.first) {
                    errors.name.first = 'Please enter first name'
                }
                if (!formValues.name?.last) {
                    errors.name.last = 'Please enter last name'
                }
                if (!formValues.location?.country) {
                    errors.location.country = 'Please enter country'
                }
                if (!formValues.location?.city) {
                    errors.location.city = 'Please enter city'
                }
                if (!formValues.location?.street?.name) {
                    errors.location.street.name = 'Please enter street'
                }
                if (!formValues.location?.street?.name) {
                    errors.location.street.number = 'Please enter street number'
                }
                // 3 characters min per name:
                if (formValues.name?.first && formValues.name?.first.length < 3) {
                    errors.name.first = 'Name must be at least 3 characters long'
                }
                return errors;
            }}

            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '95%' } }} >
                        <Grid container alignItems="flex-start">
                            <Typography variant="subtitle1" gutterBottom component="label" sx={{ pb: 1 }}>
                                Enter full name:
                            </Typography>
                            <Grid item xs={12}>
                                {renderFields(FIELDS.slice(0,3))}
                            </Grid>
                            <Grid item xs={12} sx={{ py: 1.5 }}>
                                {renderFields(FIELDS.slice(3, 4))}
                            </Grid>
                            <Typography variant="subtitle1" gutterBottom component="label" sx={{ py: 1 }}>
                                Enter full address:
                            </Typography>
                            <Grid item xs={12}>
                                {renderFields(FIELDS.slice(4))}
                            </Grid>
                            <Grid container item sx={{ py: 1, justifyContent: 'flex-end' }} xs={12}>
                                <Link to='/' style={{textDecoration: 'none'}}>
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