# Potion App

A Full-stack MERN Project involving forms

## Tech Stack

MongoDB (Database)

ExpressJS (Backend)

React (Front-End)

NodeJS (Backend)

Heroku (Deployment)

## Database

MongoDB was used to store data inserted by POST /api/magic

All data was stored in a single schema `Transactions`

```json
{
	"firstName": "string", 
	"lastName": "string", 
	"email": "string", 
	"address": {
		"street1": "string", 
		"street2": "string", 
		"city": "string", 
		"state": "string", 
		"zip": "string",
	},
	"phone": "string", 
	"payment": {
		"ccNum": "string",
		"exp": "string", },
	"quantity": "number", 
	"total": "string", 
	"orderDate": "date", 
	"fulfilled": "bool",
}
```

Being a NoSQL Database, it can store data in JSON Object Format and can store nested objects as well. As we are dealing with payments, we are also taking advantage of MongoDB being an ACID compliant Database

## REST APIs


GET /api/magic/uid - Retrieves a transaction from the database with the given uid. If no transaction is found, returns a `404`.

POST /api/magic/ - Validates that there are no duplicate transactions. If no duplicates are found, then a new transaction is created.

PATCH /api/magic - Updates a field(s) of a specific transaction with the given uid. If no transaction is found, returns a `404`.

DELETE /api/magic/uid - Deletes a specific transaction with the given uid. If no transaction is found, returns a `404`.

## Testing


**Backend Routers:**

SuperTest - allows for high-level abstraction for testing HTTP, while still being all to drop down to the lower level API

MochaJS - a JavaScript test framework for asynchronous testing 

ChaiJS - an assertion library for Node.js 

Mockgoose - an in memory database mock that allows testing applications that rely on MongoDB

## Deployment

Heroku was used to deploy the project. It offers ready-to-use environments that allows for fast code deployments, making it a suitable platform for smaller projects.
