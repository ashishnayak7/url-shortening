
import express, { Request, Response }  from 'express';
import { createPGStore, IPostgresSQLStore } from './config/dbConfig';
import { redirectRouter, urlRouter }  from './routes';
const app = express()
   
export const dbStore: IPostgresSQLStore =  createPGStore(
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`,
    `${process.env.DB_HOST}`,
    `${process.env.DB_PORT}`,
    `${process.env.DB_NAME}`,
    `${process.env.DB_SCHEMA}`,
)
   
   app.use(express.json({}));
   app.use('/', redirectRouter)
   app.use('/api/url', urlRouter)

   const context = async ({
       req,
       res,
       connection,
   }: {
       req: Request;
       res: Response;
       connection?: any;
   }) => {
    if(connection){
        return connection.context;
    } else {
        console.log('Success!');
    }
   }
   
   //Listen for incoming requests
   const PORT = process.env.PORT || 5000
   app.listen(PORT, () => {
       console.log(`Server started listening on PORT ${PORT}`)
   });