#!/bin/bash

## export all .env to variables
while read -r line; do declare -x "$line"; done < <(egrep -v "(^#|^\s|^$)" .env)

# export SSH_PRIVATE_KEY="$(cat ~/.ssh/id_ed25519)"
export SERVICE_VERSION=$(cat package.json | jq -r '.version')

## Define previous image ID
export PREV_IMAGE_TAG=$(docker inspect --format='{{.Config.Image}}' $SERVICE)
export PREV_IMG=$(docker images --filter=reference=$PREV_IMAGE_TAG --format "{{.ID}}")

## Docker with local Images
docker-compose build && docker-compose down && docker-compose rm -s -v -f && docker-compose up -d

## Define new omage ID
export NEW_IMAGE_TAG=$(docker inspect --format='{{.Config.Image}}' $SERVICE)
export NEW_IMG=$(docker images --filter=reference=$NEW_IMAGE_TAG --format "{{.ID}}")

echo "Previous image:tag = $PREV_IMAGE_TAG"
echo "New image:tag = $NEW_IMAGE_TAG"

echo "ID Image Lama = $PREV_IMG"
echo "ID Image Baru = $NEW_IMG"

if [ -z "$PREV_IMG" ]
then
	echo "Finish build first image for $SERVICE"
elif [ $PREV_IMG != $NEW_IMG ]
then
	docker image rm "$PREV_IMG"
fi
