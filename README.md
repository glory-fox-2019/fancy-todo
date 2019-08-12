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
| /todo/  | GET  | token , payload   | none  | List Of Todos   |
|  /todo | POST  | token , payload   | name:string , description:string, due_date:date |  Create new Todo |
|  /todo/:id | DELETE  | token , payload   |  none   | delete a todo  |
|  /todo/:id/complete | PATCH  |  token , payload  |  title:string(Required) , description:string(Required) |  complete a todo |
|  /todo/:id/uncomplete | PATCH  |  token , payload  |  title:string(Required) , description:string(Required) |  uncomplete a todo |
|  /todo/:id | PUT  |  token , payload  | title:string(Required) , description:string(Required)  | update a todo  |