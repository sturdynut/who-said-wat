"use strict";

function AuthController() {}

AuthController.get = get;

function get( req, res ) {

  // Such a poor mans auth...only got so much time.
  if ( req.params.guid && req.params.guid === process.env.ADMIN_GUID ) {
    res.status( 200 ).json( {
      success: true
    } );
  }

  res.sendStatus( 404 );
}

module.exports = AuthController;
