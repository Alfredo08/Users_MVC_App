const express = require( 'express' );
const {CommentController} = require( './../controllers/commentController' );
const CommentRouter = express.Router();

CommentRouter
    .post( '/addComment', CommentController.addComment );

module.exports = { CommentRouter };