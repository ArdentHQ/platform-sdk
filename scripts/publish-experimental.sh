#!/usr/bin/env bash

for dir in `find packages -mindepth 1 -maxdepth 1 -type d | sort -nr`; do
    cd $dir
    echo $PWD
    NODE_AUTH_TOKEN=$1 npm publish --access=public --publish-branch=feat/mainsail-evm --tag=experimental
    cd ../..
done
