import Icon from "../Icons/appointment-icon.svg"

interface Appointment {
  makeAppointment: () => void
}

export default function AppointmentIcon({ makeAppointment }: Appointment) {
  return (
    <button
      onClick={makeAppointment}
      className="flex justify-center bg-[#D9D9D9]/[0.51] w-[110px] py-1 rounded-[6px] items-center shadow-sm hover:shadow-xl hover:bg-[#D9D9D9]/[0.71] transition-all duration-200 ease-in-out"
    >
      <img
        src={Icon}
        alt="Appointment Icon"
        className="bg-contain w-6 h-6 mr-2 flex justify-center"
      />
      <p className="text-l font-medium text-white">จองคิว</p>
    </button>
  )
}
