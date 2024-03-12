import { useNavigate } from "react-router-dom"
import { LocalStorageUtils } from "../../utils/LocalStorageUtils"
import LogoIcon from "./LogoIcon"
import LogoutIcon from "./LogoutIcon"
import NotificationIcon from "./NotificationIcon"
import { useState } from "react"
import Notifications from "./Notification/Notifications"

type MenuFocus = "search" | "schedule" | "conversation" | "none"

export default function NavBar({
  isFortuneTeller,
  isFortuneTellerPage = false,
  menuFocus,
  username,
  userId
}: {
  isFortuneTeller: boolean
  isFortuneTellerPage?: boolean
  menuFocus: MenuFocus
  username: string
  userId: string
}) {
  const navigate = useNavigate()

  const role = isFortuneTeller ? "หมอดู/ผู้ใช้บริการ" : "ผู้ใช้บริการ"
  const menuList: { name: string; focus: MenuFocus; href: string }[] = [
    { name: "ค้นหาหมอดู", focus: "search", href: "/search" },
    { name: "เช็คตารางเวลา", focus: "schedule", href: "" },
    { name: "ประวัติการสนทนา", focus: "conversation", href: "/conversation" }
  ]

  const handleNotification = () => {
    setShowNotification(!showNotification)
  }
  const handleLogout = () => {
    LocalStorageUtils.removeData("token")
    navigate("/login")
  }

  const isHavingNotification = true
  const [showNotification, setShowNotification] = useState<boolean>(false)

  return (
    <div
      className={`flex justify-between py-3 px-6 items-center ${
        isFortuneTellerPage
          ? "bg-gradient-to-b from-[#4C122F] from-10% to-[#481248a0] to-90%" // [radial-gradient(ellipse_at_center, rgba(76, 18, 71, 1) 50%, rgba(72, 18, 72, 0) 100%)]"
          : ""
      }`}
    >
      <div className="flex gap-6 items-center text-white font-noto-sans font-light">
        <LogoIcon />
        {menuList.map((menu, index) => (
          <a
            key={index}
            className={`${menuFocus === menu.focus ? "text-mdd-focus-yellow" : ""} cursor-pointer`}
            href={menu.href}
          >
            {menu.name}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-5 text-sm">
        <div className="cursor-pointer relative" onClick={() => handleNotification()}>
          <NotificationIcon />
          {isHavingNotification && (
            <div className="absolute rounded-full w-3 h-3 right-0 top-0 bg-mdd-sand-yellow" />
          )}
        </div>
        {showNotification && <Notifications userId={userId} />}
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col text-white">
            <div className="font-noto-sans-eng font-normal">{username}</div>
            <div className="mt-[-2px] text-xs font-noto-sans font-light">{role}</div>
          </div>
          <div className="cursor-pointer" onClick={() => handleLogout()}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
