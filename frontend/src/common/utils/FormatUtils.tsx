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
