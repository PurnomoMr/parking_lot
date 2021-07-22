FROM node:12.16.1-slim

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev python
RUN apt-get install -y nano iputils-ping net-tools

#### Change Timezone to Asia/Jakarta ####
RUN DEBIAN_FRONTEND=noninteractive apt-get install tzdata

ENV TZ=Asia/Jakarta
RUN /bin/rm -f /etc/localzone
RUN echo "Asia/Jakarta" > /etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
## && echo $TZ > /etc/timezone

RUN dpkg-reconfigure --frontend noninteractive tzdata
###########

## All Variable
ARG SERVICE
ARG NODE_ENV

WORKDIR /var/gitproject/${SERVICE}

## Bundle app source before "npm install"
COPY package.json .

## npm install node_modules
RUN npm install
RUN npm install -g eslint