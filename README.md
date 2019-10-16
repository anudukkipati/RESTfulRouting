Representational State Transfer (REST) refers to a group of software architecture design constraints that bring about efficient, reliable, and scalable distributed systems. A system is called RESTful when it adheres to those constraints.
Beginners can assume a REST API means an HTTP service that can be called using standard web libraries and tools.
Restful routes is just a conventional pattern to follow when structuring different routes for interacting with the server whenever an HTTP request is made by the client.
The most commonly used HTTP verbs are Create, Read, Update, and Destroy (CRUD).
Routing is a way to map requests to specific handlers depending on their URL and HTTP verb.
An example RESTful Routes:
******************************************************
Name |   Path      | HTTP verb  |        Purpose   |
------------------------------------------------------
Index| /books     | GET       | List all books |
------------------------------------------------------
New  | /books/new | GET       | Show new books form |
------------------------------------------------------
Create| /books    | POST      | Create a new book |
------------------------------------------------------
Show  |/books/:id | GET       | Show info about 1 book|
-------------------------------------------------------
Edit|/books/:id/edit|GET  |Show edit form for 1 book|
-------------------------------------------------------
Update|/books/:id|  GET       |Update 1 book
------------------------------------------------------
Destroy| /books/:id| Delete  |Delete a book
--------------------------------------------------------
Source: https://developer.mozilla.org/en-US/docs/Glossary/REST