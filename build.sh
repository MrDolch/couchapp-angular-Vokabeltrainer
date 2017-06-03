#!/bin/bash

# config
ANGULARAPP_FOLDER=./vokabeltrainer
COUCHAPP_FOLDER=./couchapp
COUCHDB=http://127.0.0.1:5984/vokabeltrainer

(
  echo build app
  cd $ANGULARAPP_FOLDER
#  npm install
  npm run build

) && (
  echo package couchapp
  rm -rf $COUCHAPP_FOLDER
  couchapp generate $COUCHAPP_FOLDER
  (cd $ANGULARAPP_FOLDER/src && find . \( -name \*.html -o -name \*.css -o -name \*.js \) -exec cp -v {} ../dist/{} \;)
  cp -r -v $ANGULARAPP_FOLDER/dist/* $COUCHAPP_FOLDER/_attachments/
  cp -r    $ANGULARAPP_FOLDER/node_modules/flag-icon-css/flags/1x1 $COUCHAPP_FOLDER/_attachments/flags
  cp -r -v $ANGULARAPP_FOLDER/src/views/* $COUCHAPP_FOLDER/views/ 

  echo optional node_modules
  cp -r $ANGULARAPP_FOLDER/node_modules $COUCHAPP_FOLDER/_attachments/

) && (
  echo deploy couchapp
  cd $COUCHAPP_FOLDER
  couchapp push $COUCHDB

)
