import { NextFunction, Request, Response } from "express"

// Write handlers here, please don't call repository directly
// Do call services instead

const helloWorld = (req: Request, res: Response) => {
  res.send("Hello World")
}

export const userController = {
  helloWorld
}

export const loginUser = (req: Request, res: Response, next: NextFunction) => {

}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // below this is for mongo but i'm finding ways to use pg
    const { email, password, userId } = req.body;
    const user = await Users.findOne({email: email});
    if(user) {
      throw console.error("User already exists");
    }
  } catch (error) {
    next(error);
  }
}