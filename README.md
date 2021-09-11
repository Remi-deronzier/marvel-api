# Marvel API

Marvel API is the API to make my [Marvel web app](https://sleepy-hermann-22591e.netlify.app/) work. This API allows users to : create an account, log to this account, get all the Marvel characters, get all the Marvel comics, create bookmarks.

Frontend project is here: 👉 [Frontend](https://github.com/Remi-deronzier/marvel-frontend)

## Prerequisties

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of `node.js`, `MongoDB`
* You have a `Windowd/Linux/Mac` machine.

*Option : you can install [Postman](https://www.postman.com/) to easily make requests.*

## Installing Marvel API

Clone this repository:
```
git clone https://github.com/Remi-deronzier/marvel-api.git
cd marvel-api
```

Install packages:
```
npm i
```

Create a `.env` file at the root of the project and store the following environment variables:
```
MONGODB_URI = <your-mongodb-uri>
PORT = <the-listening-port-of-your-server>
```

When installation is complete, run the project:
```
npx nodemon index.js
```

## Route documentation (main routes)

### /user/signup (POST)
Add a new user in DB

Body | Type | Required
------------ | ------------- | ------------
`email` | string | Yes
`password` | string | Yes
`username` | string | Yes

### /user/login (POST)
Log a user

Body | Type | Required
------------ | ------------- | ------------
`email` | string | Yes
`password` | string | Yes

### /characters (GET)
Get all the characters

### /comics (GET)
Get all the comics

### /comics/:id (GET)
Get one specific comic strip

Param | Required | Description
------------ | ------------- | ------------
`id` | Yes | comic strip id
