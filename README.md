Nest Country Info API

Installation

Prerequisites

Ensure you have the following installed:

Node.js (v16+ recommended)

PostgreSQL database

Steps

Clone the repository:

git clone <repository_url>
cd <repository_folder>

Install dependencies:

npm install

Create a .env file in the root directory and add the following variables:

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name

Before starting the application you must create database. Tables creating autonaticly

Running the Application

Start the server:

npm run start

API Endpoints

Users

Create new user
POST /users
Body:

{
  "name" : "Illia"
}

Add holidays to user calendar
POST /users/:userId/calendar/holidays
Body:

{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Christmas Day"]
}

Get user holidays
GET /users/:userId/calendar/holidays

Delete a holiday from user calendar
DELETE /users/:userId/calendar/holidays/:holidayId

Countries

Get all available countries
GET /countries/available

Get special country info
GET /countries/:countryCode 

Get country holidays
GET /countries/countryCode/holidays/:year

Testing with Postman

Open Postman and create a new request.

Use the API endpoints above with appropriate HTTP methods.

For POST requests, provide a JSON body.

Ensure the server is running before sending requests.
