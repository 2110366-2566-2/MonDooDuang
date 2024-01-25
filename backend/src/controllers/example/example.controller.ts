import { Request, Response } from "express"

// Write handlers here, please don't call repository directly
// Do call services instead

const helloWorld = (req: Request, res: Response) => {
  res.send("Hello World")
}

export const exampleController = {
  helloWorld
}
