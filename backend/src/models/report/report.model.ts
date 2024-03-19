type ReportType = "INAPPROPRIATE_BEHAVIOR" | "MONEY_SUSPENSION" | "SYSTEM_ERROR"
type ReportStatus = "PENDING" | "COMPLETED"

export interface ReportSchema {
  description: string
  reportType: ReportType
  status: ReportStatus
  appointmentId: string
  reporterId: string
  reporteeId: string
}

export interface ReportInfoSchema {
  reportId: string
  reportType: ReportType
  reporterId: string
  reporteeId: string
  description: string
  reporterName: string
  reporteeName: string
  reporteeProfile: string
}
