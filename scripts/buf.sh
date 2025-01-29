#!/bin/bash

rm -rf ./backend/interface/proto
rm -rf ./frontend/src/infrastructure/proto

cd ./proto

buf generate
