import { useState } from "react"
import FailedAlert from "../../LoginPage/components/FailedAlert"
import { LoginService } from "../services/AdminLoginService"
import { useNavigate } from "react-router-dom"
import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtils"
import { AdminLoginSchema } from "../types/AdminLoginType"

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

    const loginInfo: AdminLoginSchema = {
      email: email,
      password: password
    }

    const data = await LoginService.loginAdmin(loginInfo)
    if (data.success === false) {
      setFAlert(true)
      return
    }
    LocalStorageUtils.setData("token", data.data)
    navigate("/admin/report_management")
  }

  return (
    <div className="flex flex-col justify-center items-center w-2/4">
      <p className="text-3xl text-white">ลงชื่อเข้าใช้</p>
      <p className="text-3xl text-mdd-focus-yellow">ผู้ดูแลระบบ</p>
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
      {FAlert && <FailedAlert FAlert={FAlert} setFAlert={setFAlert} />}
    </div>
  )
}
