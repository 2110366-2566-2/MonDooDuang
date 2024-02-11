import moon_icon from "./components/Icons/moon_icon.svg"
import LoginBox from "./components/LoginBox"
export default function LoginPage() {
  return (
    <div className="bg-gray-300 bg-opacity-50 w-full h-full flex flex-row justify-center items-center">
      <img src={moon_icon} alt="moon_icon" className="w-2/4" />
      <LoginBox />
    </div>
  )
}
