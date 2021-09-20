FROM registry.access.redhat.com/ubi7/ubi

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

RUN mkdir /app
WORKDIR /app

COPY backend/package.json /app
RUN npm install --only=prod
COPY backend/server /app/server
COPY backend/public /app/public

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
