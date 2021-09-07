# HomeLike
Furnished apartments for business travelers

This is a example of a HomeLike application providing a REST
API to retrieve information from Database (Mongoose).

The entire application is contained within the `HomeLike` file and was developed using NodeJS and Mongoose database

Please provide the following details in .env file 
- MONGO_URI: server details of database(mongoose database is used)
- TOKEN_KEY
- ZIPCODE_URI: this URL contains an external API call which accepts Zipcode, distance and unit as input and output will be, all the zipcode in the given distance radius. Please Generate the APIKey from website - https://www.zipcodeapi.com/API and copy it to
- API_PORT: Port details

Folder structure
- Authentication: Contains files to generate JWT token
- Config: Contains files to connect to database
- Model: Create models for apartment and user
- UseCase: Contains functions which is to be invoked when corresponding endpoint is called

`run-tests.sh` runs a simplistic test and generates the API
documentation below.

## Install

    npm install

## Run the app

    npm run start

## Run the tests

    ./run-tests.sh

# REST API

The REST API to the example app is described below.

## Get list of Things

### Create a new User

`POST http://localhost:4001/userRegistration`

### Request

   {
    "firstName": "abc",
    "lastName": "xyz",
    "email": "abc@xyz.com", 
    "password": "123456"
    }

### Response

    {
    "success": true,
    "message": "User created successfully!!!",
    "data": {
        "Name": "adarshps",
        "Email": "adarsh@ps.com"
    }
}

## User Login

### Request

`POST http://localhost:4001/userLogin`

### Request

   {
    "email": "adarsh@as.com", 
    "password": "111111"
    }

### Response

    {
    "success": true,
    "message": "Login Successful!!!",
    "data": {
        "Name": "adarshps",
        "Email": "adarsh@ps.com",
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTM3ODM0ZjdhNjAyNTI3M2U0ZDFjYzkiLCJlbWFpbCI6ImFkYXJzaEBwcy5jb20iLCJpYXQiOjE2MzEwMzA3NDgsImV4cCI6MTYzMTAzNzk0OH0.JkGX1AXTgBpaZ4uKap0DqqWZIIec93Yy3OY9jwTC_vo"
    }
}

The above token is used in header (x-access-token) for authentication 
## Apartment Creation

### Request

`GET http://localhost:4001/apartmentCreation`

    {
        "address": "Apartment No-1",
        "zipcode": "10115",
        "city": "Berlin", 
        "country": "Germany",
        "room": 3
    }
### Response

{
    "success": true,
    "message": "Apartment creation Successful!!!",
    "data": {
        "Address": "House No-5",
        "Zipcode": "67655",
        "City": "ksr",
        "Country": "germany",
        "Room": 10
    }
}
## Filter Apartment based on city, country and room

### Request

`GET http://localhost:4001/apartmentFilter`

{
    "city": "Berlin",
    "country": "Germany",
    "room": "3"
}
### Response

{
    "success": true,
    "data": [
        {
            "_id": "613783aa7a6025273e4d1ccf",
            "address": "House No-1",
            "zipcode": "10115",
            "city": "berlin",
            "country": "germany",
            "room": 5,
            "user": {
                "_id": "613783407a6025273e4d1cc6",
                "firstName": "venugopal",
                "lastName": "PN",
                "email": "venugopal@pn.com"
            }
        }
    ]
}

## Filter apartment based on ZipCode

### Request

Please Generate the APIKey from website - https://www.zipcodeapi.com/API and copy it to .env file (ZIPCODE_URI)

`POST http://localhost:4001/apartmentFilterBasedOnZipCode`

{
    "zipCode": "10115",
    "distance": "5",
    "units": "km"
}
### Response

    {
    "success": true,
    "data": [
        {
            "_id": "613783aa7a6025273e4d1ccf",
            "address": "House No-1",
            "zipcode": "10115",
            "city": "berlin",
            "country": "germany",
            "room": 5
        },
        {
            "_id": "6137842b7a6025273e4d1cd8",
            "address": "House No-2",
            "zipcode": "10117",
            "city": "berlin",
            "country": "germany",
            "room": 3
        }
    ]
}

## Favourite Apartment

### Request

`POST http://localhost:4001/apartmentFavourite`

{
    "apartmentId": "613783aa7a6025273e4d1ccf"
}

### Response

{
    "success": true,
    "data": {
        "firstName": "adarsh",
        "lastName": "ps",
        "email": "adarsh@ps.com",
        "favouriteApartment": [
            {
                "_id": "613783aa7a6025273e4d1ccf",
                "address": "House No-1",
                "zipcode": "10115",
                "city": "berlin",
                "country": "germany",
                "room": 5
            }
        ]
    }
}
## List Favourite Apartment

### Request

`POST http://localhost:4001/listfavouriteApartment`

No input
UserId will be generated from token

### Response
{
    "success": true,
    "data": {
        "firstName": "adarsh",
        "lastName": "ps",
        "email": "adarsh@ps.com",
        "favouriteApartment": [
            {
                "_id": "613783aa7a6025273e4d1ccf",
                "address": "House No-1",
                "zipcode": "10115",
                "city": "berlin",
                "country": "germany",
                "room": 5
            }
        ]
    }
}


