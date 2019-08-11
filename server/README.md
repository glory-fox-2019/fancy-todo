# Fancy-todo
_By : Josprima Sihombing_ :D

## Description
This is an app for managing your todo, you can create, read, update and delete your todos. Please read this guide carefully so you can understand how to use this api, or if you can't understand because bad documentation, you can call me. Peace V


## How to make a Request

### Endpoint List :
  * __Create an Account__

To create an account you can hit endpoint :
__/user/signup__

| Method   | Headers            | Body              | Respon        |
| ---------|:------------------| :----------------| :-------------|
| __POST__ | none               | firstName:String, lastName:String, email:String,password:String | If success code : __201__ and data that created in JSON format. Or if failed __400__ or __500__|

  * __Login an Account__

To login an account you can hit endpoint :
__/user/login__

| Method   | Headers            | Body              | Respon        |
| ---------|:------------------| :----------------| :-------------|
| __POST__ | none               | email:String,password:String | If success code : __200__ and token in JSON format. Or if failed __400__ or __500__|

To login an account with google oauth2 you can hit endpoint :
__/user/signinGoogle__

| Method   | Headers            | Body              | Respon        |
| ---------|:------------------| :----------------| :-------------|
| __POST__ |                | token | If success code : __200__ and token in JSON format. Or if failed __400__ or __500__|

  * __Get all user todos__

To get all user todos you can hit endpoint :
__/user/dashboard__

| Method   | Headers            | Body              | Respon        |
| ---------|:------------------| :----------------| :-------------|
| __GET__ | token               | none | If success code : __200__ and todos list in JSON format (Array of object). Or if failed __400__ or __500__|