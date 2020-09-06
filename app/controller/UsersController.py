import datetime
from app.model.Users import Users
from flask import request
from app import response, db
from sqlalchemy import exc
from flask_jwt_extended import create_access_token, create_refresh_token



def all():
    try:
        user = Users.query.all()
    
        if not user:
            return response.NOT_FOUND([], "Not found")

        data = transform(user)

        return response.OK(data, "All account loaded")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], 'failed to load user data')
    


def signup():
    try:
        name = request.json['name'].strip()
        email = request.json['email'].strip()
        user_name = request.json['userName'].strip()
        password = request.json['password']

        user = Users(name=name, email=email, user_name=user_name)
        user.setPassword(password)
        db.session.add(user)
        db.session.commit()

        return response.CREATED([], 'Successfully Add Users')

    except exc.IntegrityError:
        return response.BAD_REQUEST([], "Integrity error, check email and user_name")
    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Internal server error")



def login():
    try:
        user_name = request.json['userName'].strip()
        password = request.json['password']
        user = Users.query.filter_by(user_name=user_name).first()

        if not user:
            return response.NOT_FOUND([], 'No user found')

        if not user.checkPassword(password):
            return response.UNAUTHORIZED([], 'Your credentials is invalid')

        expires = datetime.timedelta(days=1)
        expires_refresh = datetime.timedelta(days=3)
        access_token = create_access_token({'id': user.id}, fresh=True, expires_delta=expires)
        refresh_token = create_refresh_token({'id': user.id}, expires_delta=expires_refresh)

        return response.OK({
            "token_access": access_token,
            "token_refresh": refresh_token,
        }, "Login Succes")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR('', "Failed to login")
        

# def show(user_name):


# def update(user_name):
#     try:
#         user = Users.query.filter_by(user_name=user_name).first()
#         if not user:
#             return response.NOT_FOUND([], 'No user found')

#         user.user_name = request.json['userName'].strip()
#         user.email = request.json['email'].strip()
#         user.name = request.json['name'].strip()
#         user.setPassword(request.json['password'])

#         db.session.commit()

#         return response.OK([], "Update Success")

#     except exc.IntegrityError:
#         return response.BAD_REQUEST([], "Integrity error, check email and user_name")
#     except Exception as e:
#         return response.INTERNAL_SERVER_ERROR([], "Internal server error")


def transform(values):
    array = []
    for i in values:
        array.append(singleTransform(i))
    return array

def singleTransform(User):
    return {
        'id': User.id,
        'name': User.name,
        'email': User.email,
        'userName': User.user_name
    }