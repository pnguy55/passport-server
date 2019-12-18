module.exports = (survey, user) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>
                <p>${user.credits}</p>
                <div>
                    <a href="${process.env.EMAIL_REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
                </div>
                <div>
                    <a href="${process.env.EMAIL_REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
                </div>
            </div>
        </body>
    </html>
    `;
};