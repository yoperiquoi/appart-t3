#!/bin/sh
cd "$(dirname "$0")" && node build.js "$@" >/dev/null && cd .. && NODE_PATH=${NODE_PATH:-$(npm root -g)} node sources/check.js $(echo "$@" | sed 's/p\([0-9]*\)\.js/\1/g')
