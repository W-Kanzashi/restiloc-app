#!/bin/bash

export EXPO_PASSWORD=qZ7Jy9sARAXU3e0MxxDb
export EXPO_USERNAME=kanzashi
export EXPO_ANDROID_KEYSTORE_PASSWORD=c0ccd12d45774b55a271ef57a9ac2e7b
export EXPO_ANDROID_KEY_PASSWORD=80d18c5d95334c9db728b09be093327b

expo export --dev --public-url http://127.0.0.1:8000

npx http-server -p 8000 dist &
server=$!

turtle build:android \
  --type apk \
  --keystore-path credentials/android/keystore.jks \
  --keystore-alias QGthbnphc2hpL3Jlc3RpbG9jLWFwcA== \
  --allow-non-https-public-url \
  --public-url http://127.0.0.1:8000/android-index.json

kill $server
