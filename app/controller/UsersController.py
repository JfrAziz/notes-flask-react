import datetime
from app.model.Users import Users
from flask import request
from app import response, db
from sqlalchemy import exc
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity


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

        access_token, refresh_token = getToken(user.id)
        
        return response.CREATED({
            "access_token": access_token,
            "refresh_token": refresh_token,
        }, 'Successfully Add Users')

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

        access_token, refresh_token = getToken(user.id)    

        return response.OK({
            "access_token": access_token,
            "refresh_token": refresh_token,
        }, "Login Succes")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR('', "Failed to login")
        

@jwt_required
def show(id):
    try:
        current_user = get_jwt_identity()
        if current_user and current_user['user_id'] == id:
            user = Users.query.filter_by(id=current_user['user_id']).first()
            if not user:
                return response.NOT_FOUND([], 'No user found')

            data = singleTransform(user)

            return response.OK({
                "user" : data
            }, "User data loaded")

        else:
            return response.UNAUTHORIZED([], "Your credential is invalid")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to login")



def getToken(id):
    expires = datetime.timedelta(days=1)
    expires_refresh = datetime.timedelta(days=3)
    access_token = create_access_token({'user_id': id}, fresh=True, expires_delta=expires)
    refresh_token = create_refresh_token({'user_id': id}, expires_delta=expires_refresh)

    return access_token, refresh_token


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