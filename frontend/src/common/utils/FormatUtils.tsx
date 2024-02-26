export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber === null || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
    return "Invalid phone number"
  }

  const formattedNumber = `${phoneNumber.substr(0, 3)}-${phoneNumber.substr(
    3,
    3
  )}-${phoneNumber.substr(6, 4)}`
  return formattedNumber
}

export const formatCitizenId = (str: string): string => {
  const substrings = [
    str.slice(0, 1),
    str.slice(1, 5),
    str.slice(5, 10),
    str.slice(10, 12),
    str.slice(12)
  ]

  return substrings.join("-")
}

export const formatDateTime = (isoDateTimeString: string) => {
  const date = new Date(isoDateTimeString)

  // Format date as "dd/mm/yyyy"
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear().toString()
  const formattedDate = `${day}/${month}/${year}`

  // Format time as "HH.MM"
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const formattedTime = `${hours}.${minutes}`

  return [formattedDate, formattedTime]
}