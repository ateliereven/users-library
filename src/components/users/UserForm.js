import React from "react";
import { Field, Form } from 'react-final-form';
import { useSelector } from "react-redux";

const UserForm = (props) => {
    console.log(props);
    // Get list of existing email addresses of current users:
    const userEmails = useSelector(state => state.forEach(user => user.email));
    console.log(userEmails);

    // Display an error message:
    const renderError = ({ error, touched }) => { // error and touched are destructured from meta
        if (touched && error) {
            return <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        }
    }

    // email validation:
    const validateEmails = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email) === false) return 'Please enter a valid email address';
        if (userEmails.includes(email)) return 'Email already exists in library';
    }

    // the field attributes:
    const FIELDS = [
        { label: "Title", name: "name[title]" },
        { label: "First name", name: "name[fisrt]" },
        { label: "Last name", name: "name[last]" },
        { label: "Enter Email", name: "email" },
        { label: "Country", name: "location[country]" },
        { label: "City", name: "location[city]" },
        { label: "Street", name: "location[street][name]" },
        { label: "Number", name: "location[street][number]" },
    ];
    //Return an input element to the component prop, and hook it with relevant properties deconstructed from formProps:
    const renderInput = ({ input, label, meta }) => {
        return (
            <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}/*adds the class error when there is an error message*/>
                <label>{label}</label>
                <input {...input} autoComplete="off"/*optional to turn off autocomplete*/ />
                {renderError(meta)}
            </div> // input takes all the keys from formProps and assigns them as props to the input element
        );
    }
    // Whenever the user submits the form the inputs are validated. 
    // If they are valid onSubmit callback is called from the parent component and all form values are dispatched
    const onSubmit = (formValues) => {
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
                // to get a customised arror message for each field:
                FIELDS.forEach(({ name, label }) => {
                    if (!formValues[name] && formValues[label]) {
                        errors[name] = `Please enter ${label.toLowerCase()}`
                    }
                })
                return errors;
            }}

            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="ui form error"/*to show errors on the form, semantic ui defaults them to display none*/>
                    <div>
                        <label>Enter full name:</label>
                        <Field name="name[title]" component={renderInput} label="Title" />
                        <Field name="name[fisrt]" component={renderInput} label="First name" />
                        <Field name="name[last]" component={renderInput} label="Last name" />
                    </div>
                    <Field name="email" component={renderInput} label="Enter Email" />
                    <div>
                        <label>Enter full address:</label>
                        <Field name="location[country]" component={renderInput} label="Country" />
                        <Field name="location[city]" component={renderInput} label="City" />
                        <Field name="location[street][name]" component={renderInput} label="Street" />
                        <Field name="location[street][number]" component={renderInput} label="Number" />
                    </div>
                    <button type="submit" className="ui button primary">Add</button>
                </form>
            )}

        />
    )
}

export default UserForm;