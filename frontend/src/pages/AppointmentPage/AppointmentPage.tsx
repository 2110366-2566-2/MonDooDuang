import AppointmentPanel from "./components/AppointmentPanel"
import { NextPageIcon } from "./components/Icon"
import { environment } from "../../common/constants/environment"

export default function AppointmentPage() {
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
        <div className="text-mdd-nav-yellow">ใบจองการนัดหมอดู</div>
      </div>
    )
  }
  return (
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
        />
      </div>
    </div>
  )
}
