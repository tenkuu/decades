# decades

## Installation

- Install node: https://nodejs.org/en/download/. Node is essential to develop and run the Decades.
- **[IMPORTANT]** To clone from GitLab, it is recommended to setup the SSH access. However, this did not work well for some of our teammates. In this case, clone the project using HTTPS and then enter your SFU Computing ID and corresponding password to authorize. You will need to do it only once and the credentials will be stored in the Credential Manager that your Git is using. 
- Once you pulled the repository, navigate to the master folder and run `npm run install-project` which would install all the current node modules for both server and client.
- You can now run `npm run dev` and start developing!

## Development environment

Generally speaking, Decades has two components - client and server. Client is based on React while Server is an express app. You can run both in isolation from each other as they represent independent parts of the project.

This describes purpose and usage of app's scripts defined in `package.json` at the root level. For client-specific scripts and development support check out `client/package.json`. To run the following, you need to be at the root level of the project:

- `npm run dev` - you would want to use this almost all of the time. This starts up the react app and the server app concurrently. Both server and client will auto-refresh when changes were made and React app can still make calls to the server. The only difference between this and production build is that client folder contains all the source files and it runs on its own mini-server. Server app runs on http://localhost:5000 and client app runs on http://localhost:3000

- `npm run dev-server` - use this when you just want to test the backend for the API calls. You could use Postman (https://www.postman.com/downloads/) or any other similar software. Server app runs on http://localhost:5000. Server serves the `index.html` by default from `client/build`.

- `npm run dev-client` - use this when you just want to test the React front-end. In this case, beware when testing some components of the app which rely on API calls. Client app runs on http://localhost:3000.

- `npm run build` - use this to build the app that can be deployed to Google App Engine. The process creates `deployment/` folder with React build and trimmed number of server files. This is used to GitLab CI/CD in our project.

- `npm run test` - use this to test the app in "production-like" environment - it will build the React app and run server only (as oppose to `dev` which runs client in development mode). You could use this to confirm that the app would work properly on the cloud.

## How to contribute

- Create branch for **every** task you are working on.
- One nice way to maintain branches in order is to create them under your name. An example branch name could be `john/improve_performance` where john would be like a "folder" signifying all branches of john.
- **Never** commit straight to master. Always work on a branch first and then either merge the branch or go through the merge request where someone from the team reviews the code (probably applicable during polish phase)

## Known issues

- None at the moment.