import LogoIcon from "./LogoIcon"
import LogoutIcon from "./LogoutIcon"
import NotificationIcon from "./NotificationIcon"

export default function NavBar() {
  return (
    <div className="flex justify-between py-3 px-6 items-center">
      <div className="flex gap-6 items-center">
        <LogoIcon />
        <div className="text-white font-sans font-light">ค้นหาหมอดู</div>
        <div className="text-white font-sans font-light">เช็คตารางเวลา</div>
        <div className="text-white font-sans font-light">ประวัติการสนทนา</div>
      </div>
      <div className="flex">
        <NotificationIcon />
        <div className="flex flex-col">
          <p className="font-medium">Username</p>
        </div>
        <LogoutIcon />
      </div>
    </div>
  )
}
