**Fancy Todo**
----
RESTful API documentation for Hackflix App.

* **URL**

  `/users/register`

* **Method:**
  
    POST

* **Data Params**

```json
{
    "data": [
        {
        "email":"john@mail.com",
        "password":"secretpassword"
        }]
}
```

* **Success Response:**
  
  The API will response with returnin id and email. Password is excluded

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "data": [
        {
            "id": 1,
        "email":"john@mail.com"
        }]
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "msg": "Email must be unique"
}
```
or
```json
{
    "msg": "You are not authorized"
}
```

* **URL**

  `/users/login`

* **Method:**
  
    POST

* **Data Params**

```json
{
    "data": [
        {
        "email":"john@mail.com",
        "password":"secretpassword"
        }]
}
```

* **Success Response:**
  
  The API will response access token

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "token": [
        {
        "jnjdknvcuih8hu3bnucbaich833foecliaj    
        }]
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "msg": "Invalid Email or Password"
}
```
or
```json
{
    "msg": "You are not authorized"
}
```


* **URL**

  `/movies`

* **Method:**
  
    GET

* **Success Response:**
  
  The API will response with success message with true, along with movies data.

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "data": [
        {
            "id": 1,
            "title": "Inception",
            "genre": "Action",
            "released_date": "2016-10-01",
            "director": "Leonardo di Caprio",
            "plot": "This is an awesome movie. Mindblowing",
            "poster": "1bjk23bbdwi7e3b3iqh7.png",
            "preview": "https://v.traileraddict.com/13465",
            "createdAt": "2020-08-03T07:56:14.050Z",
            "updatedAt": "2020-08-03T07:56:14.050Z"
        }]
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "success": false,
    "error": "Bad Request"
}
```


* **URL**

  `/movies/:id`

* **Method:**
  
    GET

* **Data Params**

  id=[integer]

* **Success Response:**
  
  The API will response with success message with true, along with success message response

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "data": [
        {
            "id": 1,
            "title": "Inception",
            "genre": "Action",
            "released_date": "2016-10-01",
            "director": "Leonardo di Caprio",
            "plot": "This is an awesome movie. Mindblowing",
            "poster": "1bjk23bbdwi7e3b3iqh7.png",
            "preview": "https://v.traileraddict.com/13465",
            "createdAt": "2020-08-03T07:56:14.050Z",
            "updatedAt": "2020-08-03T07:56:14.050Z"
        }]
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "success": false,
    "error": "Bad Request"
}
```

* **URL**

  `/movies/:id`

* **Method:**
  
    PUT

* **Data Params**

  id=[integer]

* **Success Response:**
  
  The API will response with success message with true, along with todo where req.params.id is match .

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "success": true,
    "msg": "Movie Watchlist is updated"
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "success": false,
    "error": "Bad Request"
}
```


* **URL**

  `/movies/:id`

* **Method:**
  
    DELETE

* **Data Params**

  id=[integer]

* **Success Response:**
  
  The API will response with success message with true

  * **Code:** 200 <br />
    **Content:** 
```json
{
    "success": true,
    "msg": "deletion success"
}
```
 
* **Error Response:**

The API will response with success message as false, along with error message.

  * **Code:** 400 Bad Request <br />
    **Content:** 
```json
{
    "success": false,
    "error": "Bad Request"
}
```
