import { exampleRepository } from "../../repositories/example.repository"

// Business logic here

export const exampleService = {
  getHelloWorld: async () => {
    // Please call repository here
    const data = await exampleRepository.find()
    if (data.length === 0) {
      return "Hello World"
    }
  }
}
