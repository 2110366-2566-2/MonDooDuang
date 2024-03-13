import { environment } from "../../../common/constants/environment"

export const ExampleService = {
  testCustomer: async (token: string) => {
    const response = await fetch(`${environment.backend.url}/example/customer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        "cache-control": "no-cache"
      }
    })
    return response.json()
  },
  testFortuneTeller: async (token: string) => {
    const response = await fetch(`${environment.backend.url}/example/fortune-teller`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        "cache-control": "no-cache"
      }
    })
    return response.json()
  },
  testAdmin: async (token: string) => {
    const response = await fetch(`${environment.backend.url}/example/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        "cache-control": "no-cache"
      }
    })
    return response.json()
  }
}
