from flask import jsonify, make_response

def res(data, message, responseCode):
    resource =  {
        'message': message,
        'data': data
    }

    return make_response(jsonify(resource)), responseCode

# Successful responses
def OK(data, message):
    return res(data,message,200)

def CREATED(data, message):
    return res(data,message,201)

def NO_CONTENT(data, message):
    return res(data,message,204)


# Client error responses
def BAD_REQUEST(data, message):
    return res(data,message,400)

def UNAUTHORIZED(data, message):
    return res(data,message,401)

def FORBIDDEN(data, message):
    return res(data,message,403)

def NOT_FOUND(data, message):
    return res(data,message,404)

def METHOD_NOT_ALLOWED(data, message):
    return res(data,message,405)


# Server error responses
def INTERNAL_SERVER_ERROR(data, message):
    return res(data,message,500)