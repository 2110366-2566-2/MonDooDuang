import React, { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { LocalStorageUtils } from "../utils/LocalStorageUtils"

export type UserType = "CUSTOMER" | "FORTUNE_TELLER" | "ADMIN"

export type AuthContextType = {
  userId: string
  userType: UserType
  username: string
  token: string
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  userType: "CUSTOMER",
  username: "",
  token: ""
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const token = LocalStorageUtils.getData("token")
  if (!token) {
    if (
      location.pathname === "/admin/fortuneteller_approvals" ||
      location.pathname === "/admin/report_management" ||
      location.pathname === "/admin/payment"
    ) {
      navigate("/admin/login")
      return
    }
    navigate("/login")
    return
  }

  const decodedToken = jwtDecode<Omit<AuthContextType, "token">>(token)
  const contextValue = { ...decodedToken, token }

  if (
    location.pathname === "/admin/fortuneteller_approvals" ||
    location.pathname === "/admin/report_management" ||
    location.pathname === "/admin/payment"
  ) {
    if (contextValue.userType === "FORTUNE_TELLER" || contextValue.userType === "CUSTOMER") {
      navigate("/admin/login")
      return
    }
  } else {
    if (contextValue.userType === "ADMIN") {
      navigate("/login")
      return
    }
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
