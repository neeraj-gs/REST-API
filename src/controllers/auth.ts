import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);
    
    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random(); //to createa random string
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


//create a New User
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body; //extracting data from our body

    if (!email || !password || !username) { //if any of the fields are missing we return unauthenticated
      return res.sendStatus(400).json({msg:"Authentication Failed"});
    }

    const existingUser = await getUserByEmail(email); //if email already exirs
    //this was teh functoin we creted to find a user using email
  
    if (existingUser) {
      return res.sendStatus(400).json({msg:"User Already Exists"});
    }
    //if no existing user we need otcreae a user anem

    const salt = random();
    const user = await createUser({ //create a user
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json({"User Created Successfully":user}).end();



  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}