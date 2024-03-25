import { useContext, useState } from "react"
import NavBar from "../../common/components/NavBar/NavBar"
import { AuthContext } from "../../common/providers/AuthProvider"
import { environment } from "../../common/constants/environment"
import { NextPageIcon } from "../AppointmentPage/components/Icon"
import { PageLine } from "../AdminReportManagementPage/components/Icon"
import WatingForPayment from "./components/WaitingForPayment"
import WatingForEvent from "./components/WatingForEvent"
import EventCompleted from "./components/EventCompleted"

const PageNavigation = () => {
  return (
    <div className="flex flex-row justify-items-start items-center space-x-3 font-noto-sans text-xl">
      <div
        className="text-white"
        onClick={() => {
          window.location.href = environment.frontend.url + "/search"
        }}
      >
        หน้าหลัก
      </div>
      <NextPageIcon />
      <div className="text-mdd-focus-yellow">ประวัติการชำระเงิน</div>
    </div>
  )
}

const menuList = ["watingForPayment", "WatingForEvent", "EventCompleted"]

export default function PaymentHistoryPage() {
  const { userId, userType, username } = useContext(AuthContext)
  const [focusedMenu, setFocusedMenu] = useState<
    "watingForPayment" | "WatingForEvent" | "EventCompleted"
  >("watingForPayment")
  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus="conversation"
        username={username}
        userId={userId}
      />
      <div className="px-20 py-8">
        <PageNavigation />
        <div className="flex justify-center flex-col items-center">
          <div className="mt-10 text-white text-4xl font-prompt">ประวัติการชำระเงิน</div>
          <div className="flex justify-center items-center"></div>
          <div className="flex justify-center items-center space-x-40 py-5">
            {menuList.map((menu, index) => (
              <div
                key={index}
                className={`${
                  focusedMenu === menu
                    ? "text-mdd-focus-yellow text-3xl"
                    : "text-white opacity-50  text-xl"
                } font-prompt cursor-pointer`}
                onClick={() =>
                  setFocusedMenu(menu as "watingForPayment" | "WatingForEvent" | "EventCompleted")
                }
              >
                {menu === "watingForPayment" && "รอชำระเงิน"}
                {menu === "WatingForEvent" && "ชำระเงินแล้ว"}
                {menu === "EventCompleted" && "ชำระเงินเสร็จสิ้น"}
              </div>
            ))}
          </div>
          <PageLine />
          {focusedMenu === "watingForPayment" && (
            <WatingForPayment userId={userId} status="WAITING_FOR_PAYMENT" />
          )}
          {focusedMenu === "WatingForEvent" && (
            <WatingForEvent userId={userId} status="WAITING_FOR_EVENT" />
          )}
          {focusedMenu === "EventCompleted" && (
            <EventCompleted userId={userId} status="EVENT_COMPLETED" />
          )}
        </div>
      </div>
    </>
  )
}
