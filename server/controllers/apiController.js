const {UserModel} = require( './../models/userModel' );
const bcrypt = require( 'bcrypt' );

const APIController = {
    getAllUsers : function( request, response ){
        UserModel.getUsers()
            .then( users => {
                let userWithoutPassword = users.map( user => {
                    // Map through comments here if you need to include comments too
                    return {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        userName : user.userName
                        //comments : user.comments
                    }
                } )
                response.status( 200 ).json( userWithoutPassword );
            });
    },
    deleteUser : function( request, response ){
        let userName = request.params.userName;

        UserModel
            .getUserById( userName )
            .then( user => {
                if( user === null ){
                    throw new Error( "That user doesn't exist" );
                }
                else{
                    UserModel
                        .deleteUserById( userName )
                        .then( result => {
                            response.status( 204 ).end();
                        });
                }
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })

    },
    addNewUser : function( request, response ){
        let { firstName, lastName, userName, password } = request.body;

        if( firstName && lastName && userName && password ){
            
            bcrypt.hash( password, 10 )
                .then( encryptedPassword => {
                    const newUser = {
                        userName,
                        firstName,
                        lastName,
                        password : encryptedPassword
                    };
                    UserModel
                        .createUser( newUser )
                        .then( user => {
                            request.session.firstName = user.firstName;
                            request.session.lastName = user.lastName;
                            request.session.userName = user.userName;
                            response.status( 201 ).json( user );
                        });
                });  
        }
        else{
            response.statusMessage = "You are missing a field to create a new user ('userName', 'firstName', 'lastName', 'password')";
            response.status( 406 ).end();
        }      
    },
    updateUser : function( request, response ){
        let { firstName, lastName, password } = request.body;
        let userName = request.params.userName;

        let fieldsToUpdate = {}

        if( firstName ){
            fieldsToUpdate.firstName = firstName;
        }

        if( lastName ){
            fieldsToUpdate.lastName = lastName;
        }

        if( password ){
//TODO:     Missing validation (Encrypt the new password)!
            fieldsToUpdate.password = password;
        }
        
        if( Object.keys( fieldsToUpdate ).length === 0 ){
            response.statusMessage = "You need to provide at least one of the following fields to update the user ('userName', 'firstName', 'lastName', 'password')";
            response.status( 406 ).end();
        }
        else{
            UserModel
                .getUserById( userName )
                .then( user => {
                    if( user === null ){
                        throw new Error( "That user doesn't exist" );
                    }
                    else{
                        UserModel
                            .updateUser( userName, fieldsToUpdate )
                            .then( result => {
                                response.status( 202 ).json( result );
                            });
                    }
                })
                .catch( error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                })

        }
    },
    userLogin : function( request, response ){
        let userName = request.body.loginUserName;
        let password = request.body.loginPassword;
    
        UserModel
            .getUserById( userName )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist!" );
                }
    
                bcrypt.compare( password, result.password )
                    .then( flag => {
                        if( !flag ){
                            throw new Error( "Wrong credentials!" );
                        }
                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.userName = result.userName;
                        
                        let currentUser = {
                            firstName : result.firstName,
                            lastName : result.lastName,
                            userName : result.userName
                        }
                        response.status(200).json( currentUser );
                    })
                    .catch( error => {
                        response.statusMessage = error.message;
                        response.status(406).end()
                    }); 
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status(404).end();
            });
    },
    validateUser : function( request, response ){
        if( request.session.userName &&
            request.session.firstName &&
            request.session.lastName ){
                let currentUser = {
                    userName: request.session.userName,
                    lastName: request.session.lastName,
                    firstName: request.session.firstName
                }
                response.status( 200 ).json( currentUser ); 
        }
        else{
            response.statusMessage = "You need to login to be here!";
            response.status( 401 ).end();
        }
    },
    userLogout : function( request, response ){
        request.session.destroy();
        response.status(200).json({message: "Successfuly destroyed session"}); 
    }
}

module.exports = { APIController };


