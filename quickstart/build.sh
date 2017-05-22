#!/bin/bash

npm run build && cp -r src/* ../couchapp/_attachments/ && (
  cd ../couchapp && couchapp push http://192.168.1.10:5984/couchapp
)
