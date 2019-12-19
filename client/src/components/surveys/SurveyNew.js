// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';


class SurveyNew extends Component {
    state = { surveyProgress: 0 };

    renderContent() {
        switch(this.state.surveyProgress){
            case 1:
                return <SurveyFormReview onCancel={() => this.setState({ surveyProgress: this.state.surveyProgress - 1 })}></SurveyFormReview>;
            default:
                return <SurveyForm onSurveySubmit={() => this.setState({ surveyProgress: this.state.surveyProgress + 1 })}></SurveyForm>;

        }
    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'surveyForm'
})(SurveyNew);