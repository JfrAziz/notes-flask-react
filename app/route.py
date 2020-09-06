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

# @app.route('/users/<user_name>', methods=['PUT'])
# def updatUser():
#     if request.method == 'PUT':
#         return UsersController.update(user_name)
#     else:
#         return response.METHOD_NOT_ALLOWED([],"Wrong HTTP method")

@app.route('/all')
def allUsers():
   return UsersController.all()