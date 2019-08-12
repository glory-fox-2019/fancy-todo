# fancy-todo

##### List of user Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
|  user/register | POST  |  none | username:string,   password:string(Requeired)    | Register a new User   |
| user/login  | POST  |  none | username:string,   password:string(Requeired)   | Login User  |
| user/register/google  | POST  |  none |  none  | Login with Google  |


##### List of Todo Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
| /todos/  | GET  | token , payload   | none  | List Of Todos   |
| /todos/:id  | GET  | token , payload   | none  | Detail of Todo   |
|  /todos | POST  | token , payload   | title:string(Required) , description:string(Required) |  Create new Todo |
|  /todos | DELETE  | token , payload   |  none   | delete a todo  |
|  /todos/:id | PUT  |  token , payload  |  title:string(Required) , description:string(Required) |  update a todo |
|  /todos/:id | PATCH  |  token , payload  | title:string(Required) , description:string(Required)  | update a todo  |