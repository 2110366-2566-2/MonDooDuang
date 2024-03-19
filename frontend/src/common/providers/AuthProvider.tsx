import React, { createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { LocalStorageUtils } from "../utils/LocalStorageUtils"

export type UserType = "CUSTOMER" | "FORTUNE_TELLER"

type AuthContextType = {
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
      location.pathname === "/admin/report_management"
    ) {
      navigate("/admin/login")
      return
    }
    navigate("/login")
    return
  }

  const decodedToken = jwtDecode<Omit<AuthContextType, "token">>(token)
  const contextValue = { ...decodedToken, token }

  if (contextValue.userType === "FORTUNE_TELLER" || contextValue.userType === "CUSTOMER") {
    if (
      location.pathname === "/admin/fortuneteller_approvals" ||
      location.pathname === "/admin/report_management"
    ) {
      navigate("/admin/login")
      return
    }
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
