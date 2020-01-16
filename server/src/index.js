import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer,gql } from 'apollo-server-express';
import schema from './data/schemaComposer'
import mongoose from 'mongoose'



mongoose.connect("mongodb://admin:password@localhost:27017/admin",{ useNewUrlParser :"true"});

mongoose.connection.on("error",(err)=>{

    console.log("err",err);

});

mongoose.connection.on("connected",(err,res) => {
    console.log("mongoose is connected");
});


// console.log(schema.Query.)
const server = new ApolloServer({schema});



const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);