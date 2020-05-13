# Trunk - Password Manager
Capstone Project by - Kyle Stevenson, Daniel Clubb, Chaz Bruscato

## Project Setup

!Commit and push often
### Front-end:

 - Install current version of Node.js [13.9.0] (install includes NPM): https://nodejs.org/en/
 - Install Angular CLI: `npm install -g @angular/cli`
 - Verify correct versions: `ng --version`
	 - Angular CLI: 9.0.3
 - Clone the GitHub repo
 - `cd` into `trunk-app/`
 - Install dependencies: `npm install`
 	- Currently using: (ng-bootstrap, bootstrap-icons, sass)
 - Run app locally with: `ng serve`

*Remember to include `--save` when installing any new dependencies to add them to `package.json`

### Connecting to database:

 - Install MongoDB Compass: https://www.mongodb.com/products/compass
 - Paste this string "mongodb+srv://TrunkAdmin:admin@trunk-zugog.mongodb.net/test" in the connection field
 
*This string will change once users are set up on the database, the generic admin account will no longer work
