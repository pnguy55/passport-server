// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields(label, name) {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} label={label} name={name} component={SurveyField} type='text' />
        });
    }

    render(){
        return (
            <div>
                {/* If onSurveySubmit had () it would call the function the instant the component is rendered */}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            name !== "emails" ? errors[name] = `You must provide a ${name}.` : errors[name] = 'You must provide at least 1 email.';
        }
    });



    // if errors object is empty, it will allow the form to go through
    return errors;
}

export default reduxForm({
    // es6 shorthand for validate:validate
    validate,
    form: 'surveyForm',
    // this property persists values
    destroyOnUnmount: false
})(SurveyForm);