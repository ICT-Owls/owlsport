FROM --platform=amd64 node@sha256:87cea4658eb63b6bc1fb52a5f0c7f3c833615449f6e803cb8f2182f2a59ae09d
RUN echo 'Building docker image for carpooling server'

WORKDIR /carpooling-server

EXPOSE 80/tcp
EXPOSE 80/udp

RUN echo 'Adding files...'
COPY src ./src
COPY package.json ./
COPY .babelrc ./
COPY tsconfig.json ./

RUN echo 'Installing node packages...'
RUN ["npm", "i"]

RUN ["npm", "run" "test"]

ENTRYPOINT ["npm", "run", "start-prod"]