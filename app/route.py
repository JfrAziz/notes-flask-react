from app import app, response
from flask import request
from app.controller import UsersController, NotesController


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

@app.route('/notes', methods=['GET','POST'])
def notes():
    if request.method == 'GET':
        return NotesController.index()
    elif request.method == 'POST':
        return NotesController.add()
    else :
        return response.METHOD_NOT_ALLOWED([], "Wrong HTTP method")

@app.route('/notes/<int:id>', methods=['GET','PUT','DELETE'])
def notes_by_id(id):
    if request.method == 'PUT':
        return NotesController.edit(id)
    elif request.method == 'GET':
        return NotesController.show(id)
    elif request.method == 'DELETE':
        return NotesController.delete(id)
    else:
        return response.METHOD_NOT_ALLOWED([], "Wrong HTTP method")