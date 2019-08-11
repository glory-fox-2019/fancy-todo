# API - Documentation

__BASE URL__ http:localhost/8080

## List Of User Routes

### <b> Login <b>
 <b> POST </b> http:localhost/8080/user/login <br>

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Email                  | String (require)      |
| Password               | String (require)      |


### Register <br>
 <b> POST </b> http:localhost/8080/user/register<br>
 
<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Email                  | String (require)      |
| Password               | String (require)      |
| Firstname              | String (require)      |
| Lastname               | String (require)      |

### Register <br>
 <b> POST </b> http:localhost/8080/user/LoginOauth <br>
 
<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |


## List Of Todo Routes

### Create <br>
 <b> POST </b> http:localhost/8080/todo/create <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Title                  | String (require)      |
| Description            | String (require)      |
| Date                   | Date                  |


### Get All Todo <br>
 <b> GET </b> http:localhost/8080/todo/gettodo <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |


### Get By Id <br>
 <b> GET </b> http:localhost/8080/todo/getbyid/:id <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| ID                     | Number                |

### Update Todo <br>
 <b> PATCH </b> http:localhost/8080/todo/updatetodo/:id <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Title                  | String                |
| Description            | String                |
| Status                 | Boolean               |


### Delete <br>
 <b> DELETE </b> http:localhost/8080/todo/delete/:id <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

 