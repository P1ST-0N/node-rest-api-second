FROM node

WORKDIR /contact-app

COPY . /contact-app

RUN npm install

EXPOSE 3000

CMD ["node","server"]