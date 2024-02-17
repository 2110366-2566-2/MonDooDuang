import { useState } from "react"
import FailedAlert from "./FailedAlert"
import { LoginService } from "../services/LoginService"
import { useNavigate } from "react-router-dom"
import { setLocalStorage } from "../../../common/services/LocalStorage"
import { UserLoginSchema } from "../types/LoginType"

export default function LoginBox() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [FAlert, setFAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleEmailChange = (emailChanged: string) => {
    setEmail(emailChanged)
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailChanged)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const handlePasswordChange = (passwordChanged: string) => {
    setPassword(passwordChanged)
    setPasswordError(!passwordChanged)
  }

  const handleLogin = async () => {
    // Perform login logic here
    if (!email || !password || emailError) {
      handleEmailChange(email)
      handlePasswordChange(password)
      return
    }

    const loginInfo: UserLoginSchema = {
      email: email,
      password: password
    }

    const data = await LoginService.loginUser(loginInfo)
    if (data.success === false) {
      setFAlert(true)
      return
    }
    setLocalStorage("token", data.data)
    navigate("/search")
  }

  return (
    <div className="flex flex-col justify-center items-center w-2/4">
      <p className="text-3xl text-white">ยินดีต้อนรับกลับ!</p>
      <div className="flex flex-col justify-center items-center bg-mdd-login-frame p-8 mt-4 rounded-lg">
        <div className="relative">
          <p className={`${emailError ? "text-mdd-invalid-label" : "text-white"}`}>อีเมล</p>
          {emailError && (
            <div className="absolute w-full h-[35px] rounded-md border-2 border-mdd-cancel-red pointer-events-none" />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="w-[300px] h-[35px] rounded-md p-2 bg-mdd-text-field"
          />
        </div>
        <div className="mt-4 relative">
          <p className={`${passwordError ? "text-mdd-invalid-label" : "text-white"}`}>รหัสผ่าน</p>
          {passwordError && (
            <div className="absolute w-full h-[35px] rounded-md border-2 border-mdd-cancel-red pointer-events-none" />
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-[300px] h-[35px] rounded-md p-2 bg-mdd-text-field"
          />
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="w-[30%] py-[0.5vw] bg-yellow-300 rounded-md text-black font-bold text-lg hover:bg-yellow-400 my-4"
      >
        เข้าสู่ระบบ
      </button>
      <div className="flex w-[100%] justify-center items-center gap-2 text-center">
        <div className="h-[1px] w-[25%] bg-gradient-to-l from-white border-none" />
        <p className="my-1 text-white">หรือ</p>
        <div className="h-[1px] w-[25%] bg-gradient-to-r from-white border-none" />
      </div>
      <button
        onClick={() => navigate("/register")}
        className="w-[30%] py-[0.5vw] bg-orange-200 rounded-md text-black font-bold text-lg hover:bg-yellow-400 my-4"
      >
        สร้างบัญชีใหม่
      </button>
      {FAlert && <FailedAlert FAlert={FAlert} setFAlert={setFAlert} />}
    </div>
  )
}
