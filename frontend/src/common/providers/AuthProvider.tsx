import React, { createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
  const location = useLocation()
  const { userType } = useContext(AuthContext)

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
  else {
    if(userType === "FORTUNE_TELLER" || userType === "CUSTOMER"){
      if (
        location.pathname === "/admin/fortuneteller_approvals" ||
        location.pathname === "/admin/report_management"
      ) {
        navigate("/admin/login")
        return
      }
    }
  }

  const decodedToken = jwtDecode<AuthContextType>(token)

  return <AuthContext.Provider value={decodedToken}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
