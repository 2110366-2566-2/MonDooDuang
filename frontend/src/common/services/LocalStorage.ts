import { jwtDecode } from "jwt-decode"

export const setLocalStorage = (data: any) => {
  localStorage.setItem("token", data.token)
  const decoded = JSON.parse(JSON.stringify(jwtDecode(data.token)))
  const userId = decoded["userId"]
  const userType = decoded["userType"]
  localStorage.setItem("userId", userId)
  localStorage.setItem("userType", userType)
}
