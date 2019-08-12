# Fancy Todo
Todo App but more fancy

## API

## List of Todo Routes
|Url|Method|Header(s)|Body|Success|Error|
|-|-|-|-|-|-|-|
| `/api/todos/` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> [ `{_id:objectId, title:string, description:string, tag:array, createdAt:date, updatedAt:date}`, ... ] | **Status Code:** 500<br> **Content:** `{ error : message }`
| `/api/todos/:id` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{_id:objectId, title:string, description:string, tag:array, createdAt:date, updatedAt:date}` | **Status Code:** 500 \|\| 404 <br> **Content:** `{ error : message }`
| `/api/todos/` | POST | `token` | Object | **Status Code:** 201 <br>**Content:** <br> `{_id:objectId, title:string, description:string, tag:array, createdAt:date, updatedAt:date}` | **Status Code:** 500 <br> **Content:** `{ error : message }`
| `/api/todos/:id` | PUT | `token` | Object | **Status Code:** 200 <br>**Content:** <br> `{_id:objectId, title:string, description:string, tag:array, createdAt:date, updatedAt:date}` | **Status Code:** 500 \|\| 404<br> **Content:** `{ error : message }`
| `/api/todos/:id` | DELETE | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{_id:objectId}` | **Status Code:** 500 \|\| 404 <br> **Content:** `{ error : message }`
| `/api/todos/:id/check` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{message: 'Successfully Updated'}` | **Status Code:** 500 \|\| 404 <br> **Content:** `{ error : message }`
| `/api/todos/:id/uncheck` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{message: 'Successfully Updated'}` | **Status Code:** 500 \|\| 404 <br> **Content:** `{ error : message }`


## List of User Routes
|Url|Method|Header(s)|Body|Success|Error|
|-|-|-|-|-|-|-|
| `/api/user/` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{_id:objectId, username:string, password:string, email:string, todos:array, createdAt:date, updatedAt:date}` | **Status Code:** 500 \|\| 404<br> **Content:** `{ error : message }`
| `/api/user/login/google` | POST | - | - | **Status Code:** 200 <br>**Content:** <br> `token` | **Status Code:** 500 <br> **Content:** `{ error : message }`


## List of Photo Routes
|Url|Method|Header(s)|Body|Success|Error|
|-|-|-|-|-|-|-|
| `/api/photo/` | GET | `token` | - | **Status Code:** 200 <br>**Content:** <br> `{urls: [Object]}` | **Status Code:** 500 \|\| 404 <br> **Content:** `{ error : message }`

### LINK
[Link To Client](https://localhost:8080) | 
[Link To Server](https://localhost:3100)
