# fancy-todo
## HTTP Methods
### Todos
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/todos|GET|-|-| **Code:** 200 <br>**Content:** <br> [ { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" }, ... ] |**Code:** 404<br> **Content:** { error : "todos doesn't exist" } |
|/api/todos|GET|:todoId|-| **Code:** 200 <br> **Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3", projectId="54354264b635r763253" } |**Code:** 404<br>**Content:** { error : "Product doesn't exist" } |
|/api/todos|POST|-|data: Object| **Code:** 201 <br> **Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" } , projectId="54354264b635r763253"|**Code:** 404<br>**Content:** { error: "Can't add product" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/todos|PATCH|:todoId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3", projectId="54354264b635r763253" }   |**Code:** 404<br>**Content:** { error: "Can't update product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|
|/api/todos|DELETE|:todoId|id: String| **Code:** 200<br>**Content:**<br>{ name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" , projectId="54354264b635r763253"}  |**Code:** 404<br>**Content:** { error: "Product doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|

### Projects
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/projects|GET|-|-| **Code:** 200 <br>**Content:** <br> [ { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" }, ... ] |**Code:** 404<br> **Content:** { error : "todos doesn't exist" } |
|/api/projects|GET|:projectId|-| **Code:** 200 <br> **Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3", projectId="54354264b635r763253" } |**Code:** 404<br>**Content:** { error : "Product doesn't exist" } |
|/api/projects|POST|-|data: Object| **Code:** 201 <br> **Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" } , projectId="54354264b635r763253"|**Code:** 404<br>**Content:** { error: "Can't add product" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/projects|PATCH|:projectId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3", projectId="54354264b635r763253" }   |**Code:** 404<br>**Content:** { error: "Can't update product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|
|/api/projects|DELETE|:projectId|id: String| **Code:** 200<br>**Content:**<br>{ name: "todo", description: "let's do it", status: false, due_date: 2019-08-01T06:36:05.191Z , user_id: "53215362547deg3" , projectId="54354264b635r763253"}  |**Code:** 404<br>**Content:** { error: "Product doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|

### Users
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/users/signin|POST|-|email: String, password: String| **Code:** 200<br>**Content:** <br> {token: "3821739218fewfer32rf2", username:"Aditya" }|**Code:** 400<br> **Content:** { error: "Wrong Email or Password "}  |
|/api/users/signin/google|POST|-|-| **Code:** 200<br>**Content:** {token: "3821739218fewfer32rf2", username:"Aditya Pradana" |**Code:** 400 <br>**Content:** { error: "Bad request" } |
|/api/users/signup|POST|-|username: String, email: String, password: String| **Code:** 201<br>**Content:** { message: "User has been registerd" } |**Code:** 400 <br> **Content:** { error: "Bad request}  |

