# decades

## How to contribute

- Create branch for **every** task you are working on.
- One nice way to maintain branches in order is to create them under your name. An example branch name could be `john/improve_performance` where john would be like a "folder" signifying all branches of john.
- **Never** commit straight to master. Always work on a branch first and then either merge the branch or go through the merge request where someone from the team reviews the code (probably applicable during polish phase)

## How to run

- First run `node prune` to ensure that all packages are loaded
- Start server with `node app.js` or `nodemon app.js` if you have installed `nodemon` globally.
- Access server on `localhost:3000`