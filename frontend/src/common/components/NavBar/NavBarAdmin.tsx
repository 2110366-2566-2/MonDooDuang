import { useNavigate } from "react-router-dom"
import { LocalStorageUtils } from "../../utils/LocalStorageUtils"
import LogoIcon from "./LogoIcon"
import LogoutIcon from "./LogoutIcon"

type MenuFocus = "adminApproval" | "reportManagement" | "adminPayment" | "none"

export default function NavBarAdmin({
  menuFocus,
  username
}: {
  menuFocus: MenuFocus
  username: string
}) {
  const navigate = useNavigate()

  const role = "ผู้ดูแลระบบ"
  const menuList: { name: string; focus: MenuFocus; href: string }[] = [
    { name: "จัดการคำร้องผู้ใช้", focus: "reportManagement", href: "/admin/report_management" },
    {
      name: "คำร้องขออนุญาตเป็นหมอดู",
      focus: "adminApproval",
      href: "/admin/fortuneteller_approvals"
    },
    {
      name: "การชำระเงิน",
      focus: "adminPayment",
      href: "/admin/payment"
    }
  ]

  const handleLogout = () => {
    LocalStorageUtils.removeData("token")
    navigate("/admin/login")
  }

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
