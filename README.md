# fancy-todo
## Installation
run this command before use this application :)

```javascript
npm i

npm run dev
```

## Environment
Make sure you fill all .env template :)

secret_key=

PORT=

client_id=

client_secret=

SECRET_PASSWORD=

from_email=

from_pass=
<br>
## This table below is routes of User:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/home/user` | POST | Body <br>username: String <br>password:String<br>email:String | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | create User
`/home/user/signIn` | POST | Body<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`404` Not Found | manual Login 
`/home/user/signInGoogle` | POST | **Body**<br>id_token: String | `200` OK<br>**Fail**<br>`500` Internal Server error | Sign In with google

## This table below is routes of Todo:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/home/todo` | POST | Headers <br>token: `String`<br>Body<br>name: `String`<br>description: `String`<br>due_date: `Date` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create activity todo
`/home/todo` | GET | `none` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | find all user login todo
`/home/todo/:id` | PUT | Headers<br>token: `String`<br>Body<br>name: `String`<br>description: `String`<br>due_date: `Date`<br>status: `Boolean` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Update one of activity
`/home/todo/:id` | DELETE | Headers<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete one of activity