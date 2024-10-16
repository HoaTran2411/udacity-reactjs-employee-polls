# Employees poll project
Project using reactjs and redux.
This project is a polling application that allows users to log in and interact with polls through a variety of features. The main functionalities include user authentication, voting, poll creation, and leaderboard competition.

## Key Features:
### 1. User Login and Authentication:
+ The app provides a way to impersonate or log in as an existing user via a dropdown or custom account creation process.
+ The logged-in user’s information is displayed throughout the app, and access to pages is restricted unless the user is signed in.

### 2. Home Page with Polls:
+ After logging in, users can toggle between their answered and unanswered polls. Unanswered polls are shown by default.
+ Polls are sorted by creation date, from most recent to oldest.

### 2. Poll Details:
+ Each poll shows a "Would You Rather" question, the creator’s avatar, and two voting options.
+ For answered polls, the text of each option, the number of votes, and the percentage of votes are displayed. The user’s selection is highlighted.
+ A 404 page appears if a user tries to access a non-existent poll.

### 3. Voting Process:
Users can only vote once per poll. Once a vote is cast, the poll is moved to the "Answered" section and the results are displayed.

### 4. Poll Creation:
Users can create new polls via a form located at the /add route. Upon creation, the new poll is displayed on the home page under the relevant category (answered/unanswered).

### 5. Leaderboard:
A leaderboard is available at the /leaderboard route, showing users' names, avatars, and statistics (questions asked and answered). Users are ranked by the sum of these two metrics.

## How to run project
### Step 1: `npm install`
If have any error, using `npm audit fix --force`

### Step 2: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Other: `npm run test`

Launches the test runner in the interactive watch mode.\
