import React, { useState } from "react"

export default function LoginBox() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    // Perform login logic here
    console.log("Email:", email)
    console.log("Password:", password)
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
            className="w-[300px] h-[35px] rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <p>รหัสผ่าน</p>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-[300px] h-[35px] rounded-md p-2"
          />
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="w-[30%] py-[0.5vw] bg-yellow-300 rounded-md text-black font-bold text-lg hover:bg-yellow-400 my-4"
      >
        เข้าสู่ระบบ
      </button>
      <p className="my-1">หรือ</p>
      <button
        onClick={handleLogin}
        className="w-[30%] py-[0.5vw] bg-orange-200 rounded-md text-black font-bold text-lg hover:bg-yellow-400 my-4"
      >
        สร้างบัญชีใหม่
      </button>
    </div>
  )
}
