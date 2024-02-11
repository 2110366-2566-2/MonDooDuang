import React, { useState } from "react"
import FailedAlert from "./FailedAlert"
import { LoginService } from "../services/LoginService"
import { useNavigate } from "react-router-dom"
import { setLocalStorage } from "../../../common/services/LocalStorage"

export default function LoginBox() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [FAlert, setFAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    // Perform login logic here
    if (!email || !password) {
      console.log("info not complete")
      return
    }

    const res = await LoginService.loginUser({ email, password })
    const data = await res.json()
    if (!data.success) {
      setFAlert(true)
      return
    }
    setLocalStorage(data)
    navigate("/search")
  }

  return (
    <div className="flex flex-col justify-center items-center w-2/4">
      <p className="text-3xl">ยินดีต้อนรับกลับ!</p>
      <div className="flex flex-col justify-center items-center bg-neutral-200 bg-opacity-28 p-8 mt-4 rounded-lg">
        <div>
          <p>อีเมล</p>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-[300px] h-[35px] rounded-md p-2 bg-mdd-text-field"
          />
        </div>
        <div className="mt-4">
          <p>รหัสผ่าน</p>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
        <p className="my-1">หรือ</p>
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
