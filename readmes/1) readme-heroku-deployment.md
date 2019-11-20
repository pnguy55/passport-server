#How to deploy an app with OAuth using Passport.js

##Pre-reqs
1) Heroku CLI - google search and download installer
2) Heroku -v - to make sure it is properly installed
3) Have a repo ready on github

##Step by step git and heroku integration
1) git init
2) git remote add origin [your github repo]
3) heroku login - logs you into heroku
4) heroku create
5) git remote add heroku [2nd URL provide by step 4]
6) git add -A
7) git commit -m 'message here'
8) git push origin master
9) git push origin heroku

*if you need to reset your heroku remote use the following command
git remote set -url heroku [new url]
