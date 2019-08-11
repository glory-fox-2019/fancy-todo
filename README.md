# Fancy Todo

All the APIs endpoint using base URL:
```javascript
http://localhost:3000
```

## Index of Reference:
* [Users](https://github.com/tyogautomo/fancy-todo-1#users)
* [Todos](https://github.com/tyogautomo/fancy-todo-1#todos)
* [Projects](https://github.com/tyogautomo/fancy-todo-1#projects)


## Users API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /users/register | none | name: string<br>email: string<br>password: string | Register new user |[Register](https://github.com/tyogautomo/fancy-todo-1#register)|
| POST | /users/login | none | email: string<br>password: string | Login user |[Login](https://github.com/tyogautomo/fancy-todo-1#login)|
| GET | /users/todos | {token: String} | none | Get authenticated user todos |[Get User Todos](https://github.com/tyogautomo/fancy-todo-1#get-user-todos)|

## Todos API
### All the Todos APIs below referenced to the authenticated User's "Todos"
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /todos/add | {token: String} | name: string<br>description: string<br>due_date: date | Register new user |[Create Todo](https://github.com/tyogautomo/fancy-todo-1#create-todo)|
| POST | /todos/search | {token: String} | none | Search authenticated user todos |[Search Todo](https://github.com/tyogautomo/fancy-todo-1#search-authenticated-user-todos)|
| GET | /todos/:todoId | {token: String} | none | Get one authenticated user todo |[Get One Todo](https://github.com/tyogautomo/fancy-todo-1#get-one-authenticated-user-todo)|
| PATCH | /todos/:todoId/status | {token: String} | none | Change authenticated user todo |[Change Todo Status](https://github.com/tyogautomo/fancy-todo-1#change-authenticated-user-todo-status)|
| PATCH | /todos/:todoId/edit | {token: String} | name: string<br>description: string<br>due_date: date | Edit authenticated user todo |[Edit Todo](https://github.com/tyogautomo/fancy-todo-1#edit-authenticated-user-todo-status)|
| DELETE | /todos/:todoId/delete | {token: String} |  | Delete authenticated user todo |[Delete Todo](https://github.com/tyogautomo/fancy-todo-1#delete-authenticated-user-todo-status)|

## Project API
### All the Todos APIs below referenced to the authenticated User's "Project Todos"
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /projects | {token: String} | none | Get authenticated user projects |[Get All Projects](https://github.com/tyogautomo/fancy-todo-1#get-authenticated-user-projects)|
| GET | /projects/:projectId | {token: String} | none | Get one authenticated user project |[Get One Project](https://github.com/tyogautomo/fancy-todo-1#get-one-authenticated-user-project)|
| POST | /projects | {token: String} | name: string<br>description: string<br> | Create project |[Create Project](https://github.com/tyogautomo/fancy-todo-1#create-project)|
| PATCH | /projects/:projectId | {token: String} | name: string<br>description: string<br> | Edit authenticated user project |[Edit Project](https://github.com/tyogautomo/fancy-todo-1#update-an-authenticated-user-project)|
| DELETE | /projects/:projectId | {token: String} | none | Delete authenticated user project |[Delete Project]()|
| POST | /projects/invite | {token: String} | email: string | Invite member to an authenticated user Project |[Invite Member]()|
| POST | /projects/remove-member | {token: String} | email: string | Remove member from an authenticated user Project |[Remove Member]()|
| POST | /projects/todos/add | {token: String} | name: string<br>description: string<br>due_date: date | Create project todos |[Create Project's Todo]()|
| PATCH | /projects/todos/:todoId/edit | {token: String} | name: string<br>description: string<br>due_date: date | Edit project todos |[Update Project's Todo]()|
| GET | /projects/todos/:todoId | {token: String} | none | Get one project todo |[Get a Project's Todo]()|
| DELETE | /projects/todos/:todoId/delete | {token: String} | none | Delete one project todo |[Delete Project's Todo]()|

# Request & Response Details

## Users
+ ### Register
  method: `POST`<br>
  endpoint: `/users/register`
  
  #### _Request_ :
  * body: 
    ```javascript
    name: String, required
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
      name: "johnsnow",
      email: "johnsnow@mail.com",
      password: "V5MUfXvUrP9XItkuxzfziOqjRTqWYsqusNDUsORJ7Xqae9OrU33e2"
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
          "notNull Violation: Please input your name",
          "\nnotNull Violation: Please input your email"
      ]
    }
    ```

+ ### Login
  method: `POST`<br>
  endpoint: `/users/login`
  
  #### _Request_ :
  * body: 
    ```javascript
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Get an access token (JWT Token)
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGY4NTEyNDVlNmZiMzlmNTAwN2NiYSIsIm5hbWUiOiJ5b2dhIiwiZW1haWwiOiJ5b2dhQG1haWwuY29tIiwiaWF0IjoxNTY1NTE2NjMyfQ.FeFWVOZuT1TBLszVY5gXS_XST4uUDA-PO8uM6KVPJJw"
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Wrong email / password"
    }
    ```

+ ### Get User Todos
  method: `GET`<br>
  endpoint: `/users/todos`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGY4NTEyNDVlNmZiMzlmNTAwN2NiYSIsIm5hbWUiOiJ5b2dhIiwiZW1haWwiOiJ5b2dhQG1haWwuY29tIiwiaWF0IjoxNTY1NTE2NjMyfQ.FeFWVOZuT1TBLszVY5gXS_XST4uUDA-PO8uM6KVPJJw"
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [{
        "_id": "5d4f872045e6fb39f5007cbc",
        "name": "Make a sandwich",
        "description": "make a sandwich for breakfast",
        "status": "undone",
        "due_date": "2019-08-12T00:00:00.000Z",
        "UserId": "5d4f851245e6fb39f5007cba",
        "ProjectId": null,
        "__v": 0
    }, {
        "_id": "5d4f94d7caa0407f643b2204",
        "name": "Take a bath",
        "description": "take a bath after breakfast",
        "status": "undone",
        "due_date": "2019-08-19T00:00:00.000Z",
        "UserId": "5d4f851245e6fb39f5007cba",
        "ProjectId": null,
        "__v": 0
    },
    .....
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process"
    }
    ```
## Todos

+ ### Create Todo
  method: `POST`<br>
  endpoint: `/todos/add`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * body: 
    ```javascript
    name: String, required
    description: String, required
    due_date: Date, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        UserId: 5d4f851245e6fb39f5007cba,
        ProjectId: null,
        __v: 0 
    }
    ```
  - 400<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```
    If the due_date is before today or today
    ```javascript
    {
      "code": 400,
      "message": [
          "Due date must be after today",
      ]
    }
    ```

+ ### Search Authenticated User Todos
  method: `GET`<br>
  endpoint: `/todos/search`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * query: 
    ```javascript
    name: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [{
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        UserId: 5d4f851245e6fb39f5007cba,
        ProjectId: null,
        __v: 0 
    },
    ...
    ]
    ```

+ ### Get One Authenticated User Todo
  method: `GET`<br>
  endpoint: `/todos/:todoId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params: 
    ```javascript
    todoId: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        UserId: 5d4f851245e6fb39f5007cba,
        ProjectId: null,
        __v: 0 
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: "Not found."
    }
    ```

+ ### Change Authenticated User Todo Status
  method: `GET`<br>
  endpoint: `/todos/:todoId/status`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params: 
    ```javascript
    todoId: String, required
    ```

  #### _Response_ :
  - 200
    ```javascript
    "Successfuly change a Todo status."
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: "Not found."
    }
    ```

+ ### Edit Authenticated User Todo Status
  method: `PATCH`<br>
  endpoint: `/todos/:todoId/edit`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params: 
    ```javascript
    todoId: String, required
    ```
  * body: 
    ```javascript
    name: String, required
    description: String, required
    due_date: Date, required
    ```

  #### _Response_ :
  - 200
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        UserId: 5d4f851245e6fb39f5007cba,
        ProjectId: null,
        __v: 0 
    }
    ```
  - 404<br>
    If one of fields are empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```
    
    If the due_date is before today or today
    ```javascript
    {
      "code": 400,
      "message": [
          "Due date must be after today",
      ]
    }
    ```

+ ### Delete Authenticated User Todo Status
  method: `DELETE`<br>
  endpoint: `/todos/:todoId/delete`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params: 
    ```javascript
    todoId: String, required
    ```

  #### _Response_ :
  - 200
    ```javascript
    "Successfuly delete a Todo"
    ```
  - 404<br>
    ```javascript
    {
        code: 404,
        message: "Not found."
    }
    ```

## Projects

+ ### Create Project
  method: `POST`<br>
  endpoint: `/projects`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * body: 
    ```javascript
    name: String, required
    description: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 400<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```

+ ### Get Authenticated User Projects
  method: `GET`<br>
  endpoint: `/projects`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [{
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    },
    ....
    ]
    ```
  - 401<br>
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process"
    }
    ```

+ ### Get One Authenticated User Project
  method: `GET`<br>
  endpoint: `/projects/:projectId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params
    ```javascript
    projectId: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'asdasd',
        description: 'asdasd',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found"
    }
    ```

+ ### Update an Authenticated User Project
  method: `PATCH`<br>
  endpoint: `/projects/:projectId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * body
    ```javascript
    name: String <optional>
    description: String <optional>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Updated project
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Updated Project',
        description: 'updated project description',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 400<br>
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' must not empty",
          .....
      ]
    }
    ```

+ ### Delete an Authenticated User Project
  method: `DELETE`<br>
  endpoint: `/projects/:projectId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Deleted project
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Deleted Project',
        description: 'deleted project description',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Invite a member to authenticated user projects
  method: `POST`<br>
  endpoint: `/projects/invite`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * query
    ```javascript
    memberEmail: String <required>
    projectId: String <required>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Invited member
    {
      name: "johnsnow",
      email: "johnsnow@mail.com",
      password: "V5MUfXvUrP9XItkuxzfziOqjRTqWYsqusNDUsORJ7Xqae9OrU33e2"
    }
    ```
  - 404<br>
    ```javascript
    {
        code: 404,
        message: 'It seems like user did not registered in this app yet.'
    }
    ```
    ```javascript
    {
        code: 404,
        message: 'User not found.'
    }
    ```
  - 400
    ```javascript
    {
        code: 400,
        message: 'User already a member of this project.'
    }
    ```

+ ### Remove a member from authenticated user projects
  method: `POST`<br>
  endpoint: `/projects/remove-member`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * query
    ```javascript
    UserId: String <required>
    projectId: String <required>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Updated project
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Updated Project',
        description: 'updated project description',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
        code: 404,
        message: 'Not found.'
    }
    ```

+ ### Remove a member from authenticated user projects
  method: `POST`<br>
  endpoint: `/projects/remove-member`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * query
    ```javascript
    UserId: String <required>
    projectId: String <required>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Updated project
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Updated Project',
        description: 'updated project description',
        members: [
            "jajHAhsdgshasha72d2hbH0e"
        ],
        todos: [],
        UserId: "jajHAhsdgshasha72d2hbH0e"
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
        code: 404,
        message: 'Not found.'
    }
    ```

+ ### Create a todo in authenticated user projects
  method: `POST`<br>
  endpoint: `/projects/todos/add`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * body
    ```javascript
    name: String <required>
    description: String <required>
    due_date: String <required>
    ProjectId: String <required>
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    Created todos
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Todo in Project',
        description: 'Todo in Project',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        ProjectId: 5d4f851245e6fb39f5007cba,
        __v: 0 
    }
    ```
  - 404<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```
    If the due_date is before today or today
    ```javascript
    {
      "code": 400,
      "message": [
          "Due date must be after today",
      ]
    }
    ```

+ ### Get a Project Todo in authenticated user projects
  method: `GET`<br>
  endpoint: `/projects/todos/:todoId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Todo in Project',
        description: 'Todo in Project',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        ProjectId: 5d4f851245e6fb39f5007cba,
        __v: 0 
    }
    ```
  - 404<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": "Not found."
    }
    ```

+ ### Edit a Project Todo in authenticated user projects
  method: `GET`<br>
  endpoint: `/projects/todos/:todoId/edit`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * body
    ```javascript
    name: String <required>
    description: String <required>
    due_date: Date <requried>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Updated Todo in Project',
        description: 'Updated Todo in Project',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        ProjectId: 5d4f851245e6fb39f5007cba,
        __v: 0 
    }
    ```
  - 404<br>
    If one of field is empty
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```
  - 400<br>
    If due date is before today
    ```javascript
    {
      "code": 400,
      "message": "Due date must be after today."
    }

+ ### Delete a Project Todo in authenticated user projects
  method: `DELETE`<br>
  endpoint: `/projects/todos/:todoId/delete`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: {jwt token}
    }
    ```
  * params
    ```javascript
    todoId: String <required>
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Deleted Project Todo
    {
        _id: 5d4fe61aa63cce6ba314c1ed,
        name: 'Updated Todo in Project',
        description: 'Updated Todo in Project',
        status: 'undone',
        due_date: 2019-08-12T00:00:00.000Z,
        ProjectId: 5d4f851245e6fb39f5007cba,
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```
