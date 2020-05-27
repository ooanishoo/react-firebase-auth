#!/bin/bash
echo Deploying the app to gh-pages !
npm run build;
npm run deploy;
echo "App published on:";
echo "https://ooanishoo.github.io/react-firebase-auth/";
