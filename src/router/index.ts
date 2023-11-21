import express from 'express';
const router = express.Router();

import auth from './auth';

export default ():express.Router =>{
    auth(router)
    return router;
}