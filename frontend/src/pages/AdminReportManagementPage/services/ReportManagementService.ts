import { environment } from "../../../common/constants/environment"
import { AppointmentStatus } from "../../AppointmentPage/types/AppointmentTypes"
import { ReportStatus } from "../types/ReportInfoType"

export const ReportManagementService = {
  getAllReport: async () => {
    const res = await fetch(`${environment.backend.url}/report/get-reports`)
    const data = await res.json()
    return data.data
  },

  updateReportStatus: async (reportId: string, status: ReportStatus) => {
    const res = await fetch(`${environment.backend.url}/report/update-report`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reportId,
        status
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  updateReportAndAppointment: async (reportId: string, reportStatus: ReportStatus,appointmentId:string,appointmentStatus:AppointmentStatus) => {
    const res = await fetch(`${environment.backend.url}/report/update-report-appointment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reportId,
        reportStatus,
        appointmentId,
        appointmentStatus
      })
    })
    const data = await res.json()
    return data.success
  },
  
  updateReportAndBan : async (reportId:string,reportStatus : ReportStatus, userId:string) => {
    const res = await fetch(`${environment.backend.url}/report/update-report-ban`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reportId,
        reportStatus,
        userId
      })
    })
    const data = await res.json()
    return data.success
  }
}