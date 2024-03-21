import { Request, Response } from "express"

// Write handlers here, please don't call repository directly
// Do call services instead

const helloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" })
}

export const exampleController = {
  helloWorld
}
