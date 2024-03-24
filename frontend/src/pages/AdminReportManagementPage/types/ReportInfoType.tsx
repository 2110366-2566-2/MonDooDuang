export type ReportInfoType = {
  reportId: string
  reportType: string
  reporteeId: string
  reporterId: string
  description: string
  reporterName: string
  reporteeName: string
  reporteeProfile: string
  appointmentId: string
}

export type ReportStatus = "PENDING" | "COMPLETED"
