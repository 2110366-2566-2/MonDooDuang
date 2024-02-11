import jsonwebtoken from "jsonwebtoken"

export const assignToken = (payload: any) => {
  const jwtSecret = process.env.JWT_SECRET ?? ""
  return jsonwebtoken.sign({ userid: payload }, jwtSecret)
}
