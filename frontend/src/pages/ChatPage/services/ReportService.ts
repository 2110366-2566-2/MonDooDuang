export const ReportService = {
    createReport: async(description:string, reportType: ReportType, appointmentId:string, reporterId: string, reporteeId:string) => {
        const appointmentIdVal = (appointmentId == "" )? null:appointmentId

        await fetch('http://localhost:5002/report/',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                description,
                reportType,
                appointmentIdVal,
                reporterId,
                reporteeId
            })
        })
        return 
    },

    getReporteeId: async(conversationId: string, reporterId: string):Promise<string> => {
        const res = await fetch(`http://localhost:5002/report/${conversationId}/${reporterId}`)
        const data = await res.json()
        return data.data
    }
}