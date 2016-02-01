Node Authenticator
==================

This application was inspired by the following repo: <path to the gauth repo here>.

It slightly improves on gauth by moving all hard work to the server side (express) and thus making web page consume less cpu and memory. Also, it allows for a use of a database for the secret storage.

At the moment the following databases are supported:
* Postgres
* MySQL
* SQLite3
