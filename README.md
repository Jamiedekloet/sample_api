# Sample api
sample data emitting api with token based auth with animals! Build in NodeJS

## Usage:

Run with:
``npm start`` (You need to have NodeJS and npm installed)

### Open endpoints:
Login ``POST /login``
(Login with basic auth: username & password)
This returns your token.

### Need Token:
Make sure you provide x-access-token in headers

##### Get all animals
``GET /animals ``
returns something like:
```
{
  "animals": [
      {
          "id": 1,
          "name": "Monke"
      },
      {
          "id": 2,
          "name": "Giraffe"
      },
      {
          "id": 3,
          "name": "Elephant"
      }
  ]
}
```

##### Add new animal
``POST /animals``
add body like:
```
{
    name: Zebra
}
```
## Used packages:

- [ExpressJS for http framework](https://expressjs.com/)
- [jsonwebtoken for token based authentication](https://github.com/auth0/node-jsonwebtoken)
- [lowdb as low-key json db](https://github.com/typicode/lowdb)