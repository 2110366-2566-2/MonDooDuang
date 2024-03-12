import RootLayout from "../../common/components/RootLayout/RootLayout"
import moon_icon from "../LoginPage/components/Icons/moon_icon.svg"
import LoginBox from "./components/LoginBox"
export default function AdminLoginPage() {
  return (
    <RootLayout>
      <div className="flex h-screen px-36 items-center overflow-hidden">
        <img src={moon_icon} alt="moon_icon" className="w-2/4 mt-16" />
        <LoginBox />
      </div>
    </RootLayout>
  )
}
