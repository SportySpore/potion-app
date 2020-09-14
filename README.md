

# Potion App

A Full-stack MERN Project involving forms. [https://potion-form.herokuapp.com/](https://potion-form.herokuapp.com/)

## Tech Stack


MongoDB (NoSQL Database) - Document Oriented Database

Express.js (Backend) - Web Application framework for Node.js

React (Front-End) - Client-side JavaScript library for building UI components

Node.js (Backend) - Server-side Javascript 

Heroku (Deployment) - PaaS to deploy web app

## Running Locally


Start the server - `npm run server`

Start the client - `npm run client`

Run both client and server concurrently - `npm run dev`

Run tests - `npm run test`

## Database

MongoDB was used to store data inserted by POST /api/magic

- All data was stored in a single schema `Transactions`

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

**BaseUrl:** [`https://potion-form.herokuapp.com/`](https://potion-form.herokuapp.com/)

### GET /api/magic/:uid

**Description**: Get a specific transaction with the given uid

**Body**: N/A

**Response:** 

- Status Code: 200: Transaction does not exist

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

- Status Code: 404: Transaction does not exist

    ```json
    {
        "success": "false",
        "error": "resource not found"
    }
    ```

- Status Code: 500: Unexpected Error

    ```json
    {
        "success": "false",
        "error": "Server Error"
    }
    ```

---

### POST /api/magic

**Description**: Creates a new transaction

- Body

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

**Response:**

- Status Code: 200 - New Transaction Created

    ```json
    {
        "id": "New Transaction Id Value" 
    }
    ```

- Status Code: 400 - Duplicate Name

    ```json
    {
        "success": "false",
        "error": ["A customer with the same name already exists"]
    }
    ```

- Status Code: 400 - Duplicate Email

    ```json
    {
        "success": "false",
        "error": ["A customer with the same email already exists"]
    }
    ```

- Status Code: 400 - Duplicate Phone Number

    ```json
    {
        "success": "false",
        "error": ["A customer with the same phone number already exists"]
    }
    ```

- Status Code: 400 - Duplicate Credit Card

    ```json
    {
        "success": "false",
        "error": ["A customer with the same credit card already exists"]
    }
    ```

- Status Code: 400 - Invalid Email

    ```json
    {
        "success": "false",
        "error": ["Email is not in a valid format"]
    }
    ```

- Status Code: 400 - Missing Required Field(s)

    ```json
    {
        "success": "false",
        "error": ["Please add a {missingField}"]
    }
    ```

---

### PATCH /api/magic

**Description**: Updates a field(s) of a specific transaction with the given id in the body

- **Body**

    ```json
    {
        "id": "{id}",
        "fulfilled": "true"
    }
    ```

**Response:**

- Status Code: 200 - Updated Fields

    ```json
    {
        "success": true,
        "message": "resource updated successfully"
    }
    ```

- Status Code: 404 - Transaction not found

    ```json
    {
        "success": false,
        "error": "resource not found"
    }
    ```

- Status Code: 400 - Cast Type Error

    ```json
    {
        "success": false,
        "error": "Cannot cast type STRING to BOOLEAN on field: fulfilled"
    }
    ```

- Status Code: 500 - Unexpected Error

    ```json
    {
        "success": false,
        "error": "Server error: ${error}"
    }
    ```

---

### DELETE /api/magic/:uid

**Description:**  Delete a specific transaction with the given uid

**Body:** N/A

**Response:**

- Status Code: 200 - Deleted Record

    ```json
    {
        "success": true,
        "message": "resource successfully deleted"
    }
    ```

- Status Code: 404 - Record not found

    ```json
    {
        "success": false,
        "error": "resource not found"
    }
    ```

## Testing


> `npm run test`

**Backend Routers:**

SuperTest - allows for high-level abstraction for testing HTTP, while still being all to drop down to the lower level API

MochaJS - a JavaScript test framework for asynchronous testing 

ChaiJS - an assertion library for Node.js 

Mockgoose - an in memory database mock that allows testing applications that rely on MongoDB

## Deployment


Heroku was used to deploy the project. It offers ready-to-use environments that allows for fast code deployments, making it a suitable platform for smaller projects.

To properly build both the server and client side and install all of the required modules, the following script was added to the server-side `package.json` 

```json
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```
