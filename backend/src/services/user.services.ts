import { userRepository } from "../repositories/user.repository"

// Business logic here

export const userService = {
  getHelloWorld: async () => {
    // Please call repository here
    const data = await userRepository.find()
    if (data.length === 0) {
      return "Hello World"
    }
  }
}
