# fancy-todo

## Table of Contents  
[Getting Started](#getting%20started)  
[RESTful API](#restful%20api)  
&nbsp;&nbsp;&nbsp;&nbsp;[Todo Route API](#todo%20route%20api)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Notes!](#notes!)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get /todo](#get%20/todo)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Get /todo/:name](#get%20/todo/:name)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Post /todo](#post%20/todo)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Notes!!](#notes!!)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Delete /todo/:_id](#delete%20/todo/:_id)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Patch /todo/:_id](#patch%20/todo/:_id)  
&nbsp;&nbsp;&nbsp;&nbsp;[User Route API](#user%20route%20api)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Post /user/register](#post%20/user/register)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Post /user/signin](#post%20/user/signin)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Post /user/googlesignin](#post%20/user/googlesignin)  

## Getting Started  
Open env template, fill in the environment variables, and save it as .env  
Install live-server `npm install -g live-server`  
Install nodemon `npm install -g nodemon`  
Run `npm run dev` in the server folder  
Run `live-server --host=localhost` in the client folder

## RESTful API  
Here are the APIs that are provided in this project  

| Route | HTTP | Header(s) | Body | Description |
| --- | --- | --- | --- | --- |
| `/todo` | GET | `token` | `none` | Get all the todos info |
| `/todo/:name` | GET | `token` | `none` | Filter a todo by its name similarity |
| `/todo` | POST | `token` | `name, description, due_date` | Create a todo |
| `/todo/:_id` | DELETE | `token` | `none` | Delete a todo |
| `/todo/:_id` | PATCH | `token` | `none` | Update completed status |
| `/user/register` | POST | `none` | `full_name, email, password` | Register with a new user info |
| `/user/signin` | POST | `none` | `email, password` | Sign in and get an access token based on credentials |
| `/user/googlesignin` | POST | `none` | `none` | Sign in via Google and get an access token based on credentials |

### Todo Route API


#### Notes!
For all todo routes, if the headers or token is not provided, it will return a 403 error
```
{
    "message": "You are not logged in"
}

status: 403
```
#### Get /todo

Get all logged in user's todo  
  
Output  
```
[
    {
        "_id": <todo id>,
        "name": <todo name>,
        "description": <todo description>,
        "completed": <todo status, default is false>,
        "due_date": <todo due date>,
        "qr_link": <todo qr link>
    }
]

status: 200
```

#### Get /todo/:name

Filter a todo by its name similarity  

example for get /todo/eat, it will return the name that has `eat` in it
  
Output  
```
[
    {
        "_id": <todo id>,
        "name": "Eat delicious food",
        "description": <todo description>,
        "completed": <todo status, default is false>,
        "due_date": <todo due date>,
        "qr_link": <todo qr link>
    },
    {
        "_id": <todo id>,
        "name": "Create some things",
        "description": <todo description>,
        "completed": <todo status, default is false>,
        "due_date": <todo due date>,
        "qr_link": <todo qr link>
    }
]

status: 200
```

If the name is not specified, it will return all todos

#### Post /todo
Create a new Todo with its name, description, and due_date  
On successful creation, the newly created todo will be displayed  

```
{
    "_id": <todo id>,
    "name": <todo name>,
    "description": <todo description>,
    "due_date": <todo due date in iso date>,
    "completed": <todo completion status, the default is false>,
    "qr_link": <todo qr link that contains its name, description and due date>
}

status: 201
```

If the name is empty, it will display this error message

```
{
    "message": "Todo validation failed: name: Please enter todo name"
}

status: 500
```

If the description is empty, it will display this error message

```
{
    "message": "Todo validation failed: description: Please enter description"
}

status: 500
```

If the due date is empty, it will display this error message

```
{
    "message": "Todo validation failed: due_date: Please enter deadline"
}

status: 500
```

#### Notes!!
For DELETE and PATCH method, if you are not authorized to delete or update the todo, this message will be displayed
```
{
    status: 401, 
    message: "This todo is not yours"
}

status: 401
```

#### DELETE /todo
Delete a user's todo  
On successful delete it will display this result  
```
{
    "message": "Todo successfuly deleted"
}

status 200
```

#### PATCH /todo
Set Todo completed status to true  
On successful update it will display this result  
```
{
    "n": <number of document(s) that matched>,
    "nModified": <number of updated document>,
    "ok": 1
}

status 200
```

### Todo User API

#### Post /user/register

Register with your name, email, and password  
On successful creation, it will send back your name and authentication token

```
{
    "full_name": <user name>,
    "token": <hashed token>
}

status: 201
```

If the name field is empty it will display
```
{
    "message": "User validation failed: full_name: Please enter your name"
}

status: 500
```

If the password field is empty, it will display
```
{
    "message": "Please enter your password"
}

status: 400
```

If the email field is empty, it will display
```
{
    "message": "User validation failed: email: Please enter your email"
}

status: 500
```

If the email is invalid, it will display
```
{
    "message": "User validation failed: email: This email is not valid"
}

status: 500
```

#### Post /user/signin
Sign in with email and password  
On successful login, the name and authentication token will be returned

```
{
    "full_name": <user's name>,
    "token": <user's authentication token>
}

status: 200
```

If the email and password are mismatched, this error will be displayed

```
{
    "message": "Wrong email / password"
}

status: 403
```

#### Post /user/googlesignin

Sign in using Google  
On successful login, the name and authentication token will be returned

```
{
    "full_name": <user's name>,
    "token": <user's authentication token>
}

status: 200
```

If the user try to force sign-in without Google's id token, this error message will be displayed  
```
{
    "message": "The verifyIdToken method requires an ID Token"
}

status: 500
```

If the token is wrong, this will be the output
```
{
    "message": "Wrong number of segments in token: <the wrong token>"
}

status: 500
```