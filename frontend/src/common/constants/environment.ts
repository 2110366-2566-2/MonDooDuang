export const environment = {
  jwt: {
    secret: import.meta.env.VITE_JWT_SECRET ?? ""
  },
  backend: {
    url: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5002"
  }
}
