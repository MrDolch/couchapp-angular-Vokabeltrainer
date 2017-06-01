#!/bin/bash

# config
ANGULARAPP_FOLDER=./vokabeltrainer
COUCHAPP_FOLDER=./couchapp
COUCHDB=http://192.168.1.10:5984/vokabeltrainer

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
  cp -r -v $ANGULARAPP_FOLDER/src/views/* $COUCHAPP_FOLDER/views/
) && (
  echo deploy couchapp
  cd $COUCHAPP_FOLDER
  couchapp push $COUCHDB
)
