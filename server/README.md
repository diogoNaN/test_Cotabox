
# Cotabox

### Server

Change the **port** at **src/app.js** *[line 13]* if necessary.

>To install all dependencies run:

```sh
$ yarn
```
>To execute all migrations run:<br />
```sh
$ yarn knex:migrate
```
>To start server run:<br />
```sh
$ yarn start
```
***
<br/>

### Routes
GET "http://localhost:3003/"
<br/>
POST "http://localhost:3003/"
>body

```json
{

	"firstName":  "string",

	"lastName":  "string",

	"participation":  "number"
}
```
