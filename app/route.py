from app import app, response
from flask import request
from app.controller import UsersController


@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        return UsersController.signup()
    else:
        return response.METHOD_NOT_ALLOWED([],"Wrong HTTP method")

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return UsersController.login()
    else:
        return response.METHOD_NOT_ALLOWED([],"Wrong HTTP method")

@app.route('/users/<int:id>', methods=['GET'])
def users(id):
    if request.method == 'GET':
        return UsersController.show(id)
    else:
        return response.METHOD_NOT_ALLOWED([],"Wrong HTTP method")
