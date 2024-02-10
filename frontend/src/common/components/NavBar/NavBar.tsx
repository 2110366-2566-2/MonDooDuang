import LogoIcon from "./LogoIcon"
import LogoutIcon from "./LogoutIcon"
import NotificationIcon from "./NotificationIcon"

type MenuFocus = "search" | "schedule" | "history" | "none"

export default function NavBar({
  isFortuneTeller,
  menuFocus,
  username
}: {
  isFortuneTeller: boolean
  menuFocus: MenuFocus
  username: string
}) {
  const role = isFortuneTeller ? "หมอดู/ผู้ใช้บริการ" : "ผู้ใช้บริการ"
  const menuList: { name: string; focus: MenuFocus }[] = [
    { name: "ค้นหาหมอดู", focus: "search" },
    { name: "เช็คตารางเวลา", focus: "schedule" },
    { name: "ประวัติการสนทนา", focus: "history" }
  ]

  const handleNotification = () => {}
  const handleLogout = () => {}

  return (
    <div className="flex justify-between py-3 px-6 items-center">
      <div className="flex gap-6 items-center text-white font-noto-sans font-light">
        <LogoIcon />
        {menuList.map((menu, index) => (
          <p
            key={index}
            className={`${menuFocus === menu.focus ? "text-mdd-focus-yellow" : ""} cursor-pointer`}
          >
            {menu.name}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-5 text-sm">
        <div className="cursor-pointer" onClick={() => handleNotification()}>
          <NotificationIcon />
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
