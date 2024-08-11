#!/bin/bash

cd $(dirname $0)

ask_yes_no() {
    echo -n "$* [Y/n]: "
    read ANS
    case $ANS in
        [Yy]*)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

DEPLOYMENT_ID="$(./getDeploymentId.sh)"
DATETIME="$(date "+%Y-%m-%d %H:%M:%S")"
NAME="$(git config user.name)"

if [ -z "$DEPLOYMENT_ID" ]; then
    echo "初回は手動で webapp デプロイを実行する必要があります"
    exit 1
fi

if ask_yes_no "最後に push されたコードでデプロイを実行しますか？"; then
    npx clasp deploy --deploymentId "${DEPLOYMENT_ID}" --description "by ${NAME} at ${DATETIME}"
else
    echo "Aborted."
fi
