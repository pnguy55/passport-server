const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');


module.exports = app => {

    // user is included on cookie

    app.get('/api/surveys', requireLogin, async (req, res) => {
        // the select recipients removes that from the get request
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false
        });

        res.send(surveys);
    });

    app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
        await Survey.findByIdAndDelete(req.params.surveyId);
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false
        });

        res.status(200).send(surveys)
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // chain is a great lodash tool
    _.chain(req.body)
        .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
        }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
            {
            _id: surveyId,
            recipients: {
                $elemMatch: { email: email, responded: false }
            }
            },
            {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
            }
        ).exec();
        })
        .value();

    res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey, req.user));

        try {
            await mailer.send();
            console.log('sent mail')
            await survey.save();
            console.log('saved survey')
            req.user.credits -= 1;
            const user = await req.user.save();
            console.log('updated user')
            
            res.send(user);

        } catch (err) {
            res.status(422);
        }
    });

    // app.get('api/', requireLogin, (req, res) => {

    // });

};