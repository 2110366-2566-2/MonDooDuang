import { environment } from "../../../common/constants/environment"

export const ReportService = {
  createReport: async (description: string, reportType: ReportType, reporterId: string, reporteeId: string) => {

    await fetch(`${environment.backend.url}/report/create-report`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description,
        reportType,
        reporterId,
        reporteeId
      })
    })
    return
  },

  getReporteeId: async (conversationId: string, reporterId: string): Promise<string> => {
    const res = await fetch(`${environment.backend.url}/report/reportee/${conversationId}/${reporterId}`)
    const data = await res.json()
    return data.data
  }
}