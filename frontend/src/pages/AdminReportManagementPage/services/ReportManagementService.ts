import { environment } from "../../../common/constants/environment"

export const ReportManagementService = {
  getAllReport: async () => {
    const res = await fetch(`${environment.backend.url}/report/get-reports`)
    const data = await res.json()
    return data.data
  }
}