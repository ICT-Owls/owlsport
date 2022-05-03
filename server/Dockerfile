FROM --platform=amd64 node@sha256:87cea4658eb63b6bc1fb52a5f0c7f3c833615449f6e803cb8f2182f2a59ae09d
RUN echo 'Building docker image for carpooling server'

WORKDIR /carpooling-server

EXPOSE 80/tcp
EXPOSE 80/udp

RUN echo 'Adding files...'
ADD server.js ./
ADD database.js ./
ADD utils.js ./
ADD ***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json ./
ADD routes/* ./routes/
ADD package.json ./

RUN echo 'Installing node packages...'
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start-prod"]