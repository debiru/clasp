#!/bin/bash

cd $(dirname $0)

CLASP_JSON="$(cat ../.clasp.json)"
SPREADSHEET_ID="$(echo $CLASP_JSON | xargs -0 -i node -pe '({}).spreadsheetId')"
DEPLOYMENT_ID="$(./getDeploymentId.sh)"

webapp_url() {
    URL="https://script.google.com/macros/s/${DEPLOYMENT_ID}/exec"
    if [ $# -ge 1 ]; then
        URL="${URL}?type=${1}"
    fi
    echo "$URL"
}

echo "- Spreadsheet URL:"
echo "https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit"
echo ""
echo "- Key-Value JSON:"
echo "$(webapp_url)"
echo ""
