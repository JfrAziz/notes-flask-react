from flask import request
from app import response, db
from app.model.Notes import Notes
from flask_jwt_extended import jwt_required, get_jwt_identity


@jwt_required
def index():
    try:
        current_user = get_jwt_identity()
        if current_user:
            notes = Notes.query.filter_by(user_id=current_user['user_id'])
            if not notes:
                return response.NOT_FOUND([],"No notes found")

            data = transform(notes)
            return response.OK(data, "All note")
        else:
            return response.UNAUTHORIZED([], "Your credential is invalid")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")


@jwt_required
def add():
    try:
        current_user = get_jwt_identity()
        if current_user:
            title = request.json['title']
            notes = request.json['notes']

            note = Notes(user_id=current_user['user_id'], title=title, notes=notes)
            db.session.add(note)
            db.session.commit()

            return response.CREATED([], "success add note")
        else:
            return response.UNAUTHORIZED([], "Your credential is invalid")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")


@jwt_required
def show(id):
    try:
        current_user = get_jwt_identity()
        if current_user:
            note = Notes.query.filter_by(user_id=current_user['user_id'],id=id).first()
            if not note:
                return response.NOT_FOUND([],"No notes found")

            data = singleTransform(note)
            return response.OK(data, "All note")
        else:
            return response.UNAUTHORIZED([], "Your credential is invalid")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")


@jwt_required
def edit(id):
    try:
        current_user = get_jwt_identity()
        if current_user:

            note = Notes.query.filter_by(user_id=current_user['user_id'],id=id).first()

            if not note:
                return response.NOT_FOUND([],"No notes found")

            note.title = request.json['title']
            note.notes = request.json['notes']

            db.session.add(note)
            db.session.commit()

            return response.CREATED([], "Success edit note")
        else:
            return response.UNAUTHORIZED([], "Your credential is invalid")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to edit note")




def transform(values):
    array = []
    for i in values:
        array.append(singleTransform(i))
    return array

def singleTransform(values):
    data = {
        'id': values.id,
        'title': values.title,
        'notes': values.notes,
        'created_at': values.created_at,
        'updated_at': values.updated_at,
        'user': {
            'user_id' : values.user.id,
            'name' : values.user.name,
            'email': values.user.email
        }
    }

    return data