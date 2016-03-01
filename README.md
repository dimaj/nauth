Node Authenticator
==================

This application was inspired by the following repo: https://github.com/gbraad/gauth.

The main difference between `gauth` and `nauth` is that `nauth` is utilizing server-side processing and secret storage in a database. This slightly improves on resource consumption by the client page. Also, once a new account is added, it's information is never transmitted back to the user via HTTP calls. The only way to get client secret is by requesting a QR code and scanning it. Every 30 seconds client requests new info from server and receives just the code and QR code in a base64 encoded string.

At the moment the following databases are supported:
* Postgres
* MySQL
* SQLite3


I know this project is far from perfect and could use a few improvements here and there, but I think it's a good start :)
Pull requests and Issues are welcomded!
