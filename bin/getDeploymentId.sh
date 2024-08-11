#!/bin/bash

cd $(dirname $0)

DEPLOYMENTS="$(npx clasp deployments)"

LAST_DEPLOYMENT_ID=$(echo "$DEPLOYMENTS" | grep '^-' | awk '{print $3, $2}' | grep -v '^@HEAD' | sort -V | tail -1 | awk '{print $2}')

echo "$LAST_DEPLOYMENT_ID"
