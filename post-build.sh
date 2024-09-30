#!/bin/bash

sed -i '1,1s/^/"use client"; /' ./dist/index.cjs
sed -i '1,1s/^/"use client"; /' ./dist/index.js