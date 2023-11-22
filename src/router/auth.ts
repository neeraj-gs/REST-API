import express from 'express';

import {login, register } from '../controllers/auth';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
//after login we also see a cookie