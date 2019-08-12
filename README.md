# fancy-todo API

Routes
---
Access : http://localhost:3000/api

Bellows are routes that used in the sever fancy-todo.js

- base routes TODOS url : http://localhost:3000/api/todos

    - POST : /
        - description : create new todo
        - body :
            ```
            {
                name : String
                description : String
                due : date
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {
                    "_id": "5d4f06502c69af495425b2d4",
                    "name": "Belajar oauth",
                    "description": "belajar rest api di glory fox",
                    "status": false,
                    "due": "2019-08-13T00:00:00.000Z",
                    "user": "5d4eea3cc339493d37ba300f",
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /holiday
        - description : Get upcoming holidays from API neger.date
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                        "date": "2019-08-17",
                        "localName": "Hari Ulang Tahun Kemerdekaan Republik Indonesia",
                        "name": "Independence Day",
                        "countryCode": "ID",
                        "fixed": true,
                        "global": true,
                        "counties": null,
                        "launchYear": null,
                        "type": "Public"
                    },
                    {
                        "date": "2019-12-25",
                        "localName": "Hari Raya Natal",
                        "name": "Christmas Day",
                        "countryCode": "ID",
                        "fixed": true,
                        "global": true,
                        "counties": null,
                        "launchYear": null,
                        "type": "Public"
                    }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /:id
        - description : Get one of todo
        - body : none
        - params : ToDo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "_id": "5d4f06502c69af495425b2d4",
                    "name": "Belajar oauth",
                    "description": "belajar rest api di glory fox",
                    "status": false,
                    "due": "2019-08-13T00:00:00.000Z",
                    "user": "5d4eea3cc339493d37ba300f",
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - PATCH : /:id
        - description : update data of a todo
        - body : data that may want to be updated
            ```
            {
                name : String,
                status : boolean,
                description : String,
                due : date
            }
            ```
        - params : ToDo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is updated"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /
        - description : get all data todos of a user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                        "_id": "5d4f06502c69af495425b2d4",
                        "name": "Belajar oauth",
                        "description": "belajar rest api di glory fox",
                        "status": false,
                        "due": "2019-08-13T00:00:00.000Z",
                        "user": "5d4eea3cc339493d37ba300f",
                        "__v": 0
                    },

                                        {
                        "_id": "5d4f06502c69af5425b2shqsq4",
                        "name": "Belajar sequelize",
                        "description": "belajar sequelize di fearless fox",
                        "status": true,
                        "due": "2019-08-13T00:00:00.000Z",
                        "user": "5d4eea3cc339493d37ba300f",
                        "__v": 0
                    }
                ]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

    - DELETE /:id
        - description : delete a todo
        - body : none
        - params : ToDo _id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is deleted"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
        



- base routes USERS url : http://localhost:3000/api/routes

    - POST : /
        - description : create a new user
        - body : 
            ```
                { 
                    name : String,
                    email : String,
                    password : String,
                    birthday_date : Date,

                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "todo":[],
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
                    "password":"$2a$10$KElSSENK14IoN4zsyY",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - POST : /login
        - description : login to the system
        - body : 
            ```
                { 
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 404
                ```
                {"message" : "invalid username/password"}
                ```

    - POST : /googleLogin
        - description : login to the system using google
        - body : Google OAuth Token
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```


Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ npm run dev
```
