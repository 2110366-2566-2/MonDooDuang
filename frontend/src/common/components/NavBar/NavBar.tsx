import { useNavigate } from "react-router-dom"
import { LocalStorageUtils } from "../../utils/LocalStorageUtils"
import LogoIcon from "./LogoIcon"
import LogoutIcon from "./LogoutIcon"
import NotificationIcon from "./NotificationIcon"

type MenuFocus = "search" | "schedule" | "conversation" | "none"

export default function NavBar({
  isFortuneTeller,
  menuFocus,
  username
}: {
  isFortuneTeller: boolean
  menuFocus: MenuFocus
  username: string
}) {
  const navigate = useNavigate()

  const role = isFortuneTeller ? "หมอดู/ผู้ใช้บริการ" : "ผู้ใช้บริการ"
  const menuList: { name: string; focus: MenuFocus; href: string }[] = [
    { name: "ค้นหาหมอดู", focus: "search", href: "" },
    { name: "เช็คตารางเวลา", focus: "schedule", href: "" },
    { name: "ประวัติการสนทนา", focus: "conversation", href: "" }
  ]

  const handleNotification = () => {}
  const handleLogout = () => {
    LocalStorageUtils.removeData("token")
    navigate("/login")
  }

  const isHavingNotification = true

  return (
    <div className="flex justify-between py-3 px-6 items-center">
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
