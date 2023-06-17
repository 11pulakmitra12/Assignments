const jwt = require('jsonwebtoken');

module.exports = {
    generateToken,
    getTokenData,
    validateToken
}

// function for generating new token
function generateToken(user, secretkey, expiresIn) {
    return new Promise((resolve, reject) => {
        //generating new token
        jwt.sign({ user }, secretkey, { expiresIn: expiresIn }, (err, token) => {
            if (err) {
                // token generation failed
                reject({
                    error: "Unable to generate Token.",
                    status_code: 405
                })
            }
            else {
                // token is generated
                // console.log("token generated---------->", token)
                resolve(token);
            }

        });
    });
}


//function for getting data from token
function getTokenData(token) {
    // split the token with dot(.)
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //decoding token into original data
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    //returning the data
    return JSON.parse(jsonPayload);
}

// function for validating token and generating new token
function validateToken(token, secretkey, expiresIn) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretkey, (err, authData) => {
            if (err) {
                //    console.error("error---------------->", err.name.toString());
                // checking error is related to tokenExpire or not
                if (err.name.toString() == 'TokenExpiredError') {

                    //getting expired token data
                    const jwtData = getTokenData(token);
                    if (jwtData && jwtData.user) {
                        //regenerating token-----------
                        jwt.sign({ user: jwtData.user }, secretkey, { expiresIn: expiresIn }, (err, token) => {

                            if (err) {
                                // token generation error
                                reject({
                                    error: "New Token generation failed.",
                                    status_code: 401
                                })
                            }
                            else {
                                //generated new token
                                resolve({
                                    message: "your provided token is expired. Generated new token for you.",
                                    token: token
                                });
                            }

                        });
                    }
                    else {
                        // invalid token
                        reject({
                            error: "Please enter a valid token.",
                            status_code: 401
                        })
                    }

                }
                else {
                    //invalid token
                    reject({
                        error: "Please enter a valid token.",
                        status_code: 401
                    })
                }
            } else {
                // token is valid and returning data
                resolve({
                    message: 'Token is valid.',
                    authData
                });

            }
        });
    });
}




