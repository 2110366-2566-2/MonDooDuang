import AppointmentPanel from "./components/AppointmentPanel"
import { NextPageIcon } from "./components/Icon"
import { environment } from "../../common/constants/environment"
import NavBar from "../../common/components/NavBar/NavBar"
import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function AppointmentPage({
  fid,
  pid
}: {
  fid: string | undefined
  pid: string | undefined
}) {
  const { userId, userType, username } = useContext(AuthContext)

  const previousPath = document.referrer
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
        {previousPath && previousPath != environment.frontend.url + "/search" ? (
          <NextPageIcon />
        ) : null}
        {previousPath && previousPath != environment.frontend.url + "/search" ? (
          <div
            className="text-white"
            onClick={() => {
              window.location.href = previousPath
            }}
          >
            รายละเอียดหมอดู
          </div>
        ) : null}
        <NextPageIcon />
        <div className="text-mdd-focus-yellow">ใบจองการนัดหมอดู</div>
      </div>
    )
  }
  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"search"}
        username={username}
        userId={userId}
      />
      <div className="px-20 py-8">
        <PageNavigation />
        <div className="flex justify-center items-start">
          <AppointmentPanel
            onCancel={() => {
              if (previousPath) {
                window.location.href = previousPath
              } else {
                window.location.href = environment.frontend.url + "/search"
              }
            }}
            user_id={userId}
            fid={fid}
            pid={pid}
          />
        </div>
      </div>
    </>
  )
}
