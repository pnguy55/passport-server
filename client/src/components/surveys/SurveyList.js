import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    deleteSurvey(surveyId) {
        this.props.deleteSurvey(surveyId);
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div class="card blue-grey darken-1" key={survey._id}>
                    <div class="card-content white-text">
                        <span class="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#">Yes: {survey.yes}</a>
                        <a href="#">No: {survey.no}</a>
                        <a href="#" className="btn red" onClick={() => deleteSurvey(survey._id)}> Delete Survey?</a>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }

}

function mapStateToProps(state) {
    // we declared the state piece's name in auth reducer
    return { surveys: state.surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);