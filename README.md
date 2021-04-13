<h1 align="center">
  Docs: linkapi-node
</h1>

# About the project:

API developed for integration between PipedriveAPI and BlingAPI.
Requesting and sending data from one platform to another is done through the crons.

### Postman Collection

Import the `Teste - LinkApi.postman_collection.json` on Postman App.

# Requirements:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [MongoDB](https://www.mongodb.com/)


# How to start:

### Environment variables -
- **BCRYPT_SALT**: Salt used by bcrypt to increase hash security
- **SERVER_PORT**: Port where the application runs (Ex.: 3000)
-  **JWT_SECRET**: The secret of the application, which guarantees the uniqueness of the tokens (Ex.:asdybhq47qrdb)
-  **DB_URL**: MongoDB URL (Ex.: mongodb://example:27017/example-db)
- **PIPE_TOKEN**: Access token for PipedriveAPI
- **BLING_TOKEN**: Access token for BlingAPI
- **PIPE_COMPANY_DOMAIN**: Company domain on Pipedrive
- **BLING_URL**: BlingAPI URL
- **DEALS_CRON_TIME**: Cron time that looks for deals in the PipedriveAPI (Ex.: "* * * * *") Obs.: In this example the cron will run every minute
- **ORDERS_CRON_TIME**: Cron time that send the orders to BlingAPI (Ex.: "* * * * *") Obs.: In this example the cron will run every minute

I recommend using [CronTab](https://crontab.guru/) to deal with the times of the crons

#### Install the dependencies


    $ yarn

#### To start the server in a **development** environment

Run the application:

    $ yarn dev:server

Run the crons in a different terminal:

    $ yarn dev:schedule


#### To start the server in a **production** environment

Run the application:

    $ yarn start

Run the crons in a different terminal:

    $ yarn schedule

# Routes:

`URL:` http://localhost:3000/
Returns a JSON in this format, containing the server status.

    {
		"Author": "Augusto Vinicius",
		"Github": "https://github.com/adoidadox2",
		"Project": "linkapi-node",
		"Version": "1.0.0",
		"Status": "Online"
	}

# User Routes

## Store -`POST`-

### `/users`
Register new users


	  {
		"name":"Augusto",
		"email":"augusto@email.com",
		"password":"1234"
	  }
If everything goes well, the answer will be `status 200` and the registered data will return.

	 {
		"message": "User created successfully",
		"data": {
			"name": "Augusto",
			"email": "augusto@email.comm"
		}
	 }

## Index -`GET`-

### `/users`
Returns registered users


	  {
		"message": "Successfully listed users",
		"data": [
			{
				"_id": "60739299591f682a685fb9b1",
				"name": "Augusto",
				"email": "augusto@email.com",
				"createdAt": "2021-04-12T00:21:45.371Z"
			},
			{
				"_id": "60751f73bb361b0140d2ef31",
				"name": "Vinicius",
				"email": "vinicius@email.com",
				"createdAt": "2021-04-13T04:34:59.097Z"
			}
		]
	}

# Session Routes

## Store -`POST`-

### `/session`
Creates a new session, generating a token, which will be used to access protected routes


	  {
		"email":"augusto@email.com",
		"password":"1234"
	  }
If all goes well, the answer will be `status 200` and will return the user's data and a valid token.

	{
		"message": "Session created successfully",
		"data": {
			"user": {
				"_id": "60739299591f682a685fb9b1",
				"name": "Augusto",
				"email": "augusto@email.com"
			},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDczOTI5OTU5MWY2ODJhNjg1ZmI5YjEiLCJlbWFpbCI6ImF1Z3VzdG9AZW1haWwuY29tIiwiaWF0IjoxNjE4MjgwNTk4fQ.VriX_-6ucf7xcaBLw9WatqtxO6MnmJS2g-9p_SJp9Dw"
		}
	}

# Balance Routes

These routes require **Authentication using Bearer Token**, generated on the route`/session` .


## Index -`GET`-

### `/balances`
Returns registered balances


	  {
		"message": "Successfully listed balances",
		"data": [
			{
				"_id": "60739299591f682a685fb9b1",
				"date": "12/04/2021",
				"value": 600
			},
			{
				"_id": "60751f73bb361b0140d2ef31",
				"date": "13/04/2021",
				"value": 1240.5
			}
		],
		"last_update": "2021-04-13T04:13:00.434Z"
	}

