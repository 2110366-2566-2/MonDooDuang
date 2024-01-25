import { ExampleSchema } from "../models/example/example.model"

// Connect to db here
const connection = "CONNECT TO SOME DB"

export const exampleRepository = {
  find: async (): Promise<ExampleSchema[]> => {
    return []
  }
}
