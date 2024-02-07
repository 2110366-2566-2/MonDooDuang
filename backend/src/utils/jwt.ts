import jsonwebtoken from "jsonwebtoken"

export const assignToken = (payload: any) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET!)
}

export const verifyToken = () => {

}
