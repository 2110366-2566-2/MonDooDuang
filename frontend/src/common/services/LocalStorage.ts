import { jwtDecode } from "jwt-decode"

export const setLocalStorage = (data: string) => {
  localStorage.setItem("token", data)
  const decoded = JSON.parse(JSON.stringify(jwtDecode(data)))
  const userId = decoded["userId"]
  const userType = decoded["userType"]
  localStorage.setItem("userId", userId)
  localStorage.setItem("userType", userType)
}