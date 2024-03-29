export type ReportType = "INAPPROPRIATE_BEHAVIOR" | "MONEY_SUSPENSION" | "SYSTEM_ERROR"
export type ReportStatus = "PENDING" | "COMPLETED"

export interface ReportSchema {
  description: string
  reportType: ReportType
  status: ReportStatus
  appointmentId: string | null
  reporterId: string
  reporteeId: string | null
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
  appointmentId: string
}
