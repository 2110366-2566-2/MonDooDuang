import jsonwebtoken from "jsonwebtoken"

export const assignToken = (payload: any) => {
  return jsonwebtoken.sign({userid: payload}, process.env.JWT_SECRET!)
}
