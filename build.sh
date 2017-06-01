#!/bin/bash

# config
COUCHAPP_FOLDER=./couchapp
COUCHDB=http://192.168.1.10:5984/couchapp

( echo build app
  cd quickstart
  npm install
  npm run build
)
( echo package couchapp
  rm -rf $COUCHAPP_FOLDER
  couchapp generate $COUCHAPP_FOLDER
  (cd quickstart/src && find . \( -name \*.html -o -name \*.css -o -name \*.js \) -exec cp -v {} ../dist/{} \;)
  cp -r -v quickstart/dist/* $COUCHAPP_FOLDER/_attachments/
#local  cp -r quickstart/node_modules $COUCHAPP_FOLDER/_attachments/
)
( echo deploy couchapp
  cd $COUCHAPP_FOLDER
  couchapp push $COUCHDB
)
