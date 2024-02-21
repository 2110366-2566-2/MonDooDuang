import React, { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { LocalStorageUtils } from "../utils/LocalStorageUtils"

export type UserType = "CUSTOMER" | "FORTUNE_TELLER"

type AuthContextType = {
  userId: string
  userType: UserType
  username: string
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  userType: "CUSTOMER",
  username: ""
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  const token = LocalStorageUtils.getData("token")
  if (!token) {
    navigate("/login")
    return
  }

  const decodedToken = jwtDecode<AuthContextType>(token)

  return <AuthContext.Provider value={decodedToken}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
