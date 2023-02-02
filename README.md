# This is a twitter like app practice

#### Server side built by

- Mongoose
- Express
- Redis
- TypeScript
- JWT

#### How to start the server

1. git clone.
2. Create .env file.
3. Copy the connect config from `cloud.mongodb.com`(Atlas Mongo DB). (ex: `mongodb+srv://username:<password>@project-name.ejb9xzv.mongodb.net/?retryWrites=true&w=majority`)
4. Change the password that you copied from to connect the DB.
5. Create variables in .env for DB and JWT secret code.
   -> MONGO_DB=mongodb+srv://username:<password>@project-name.ejb9xzv.mongodb.net/?retryWrites=true&w=majority
   -> JWT=yourSecretCodeWhateverItIs
6. Command run `yarn install`
7. Command run `start:nodemon` to start the server.

**Note:** ofc you can change the DB as you want, basically it's express + ts + nodemon for the server.
