#!/bin/bash

YEAR=`cat year.txt`
mkdir -p $YEAR
DAY=`printf "%02d" $(expr 1 + $(ls $YEAR/day*.js | wc -w))`
DAY=$DAY envsubst <template.js >"${YEAR}/day${DAY}.js"
subl "${YEAR}/day${DAY}.js"
