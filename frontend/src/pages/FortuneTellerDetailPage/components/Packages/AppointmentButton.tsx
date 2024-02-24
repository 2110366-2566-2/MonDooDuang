import appointmentIcon from "../../../../assets/fortuneTellerDetailsAssets/appointmentIcon.svg"

interface AppointmentButtonProps {
  makeAppointment: () => void
}

export default function AppointmentButton({ makeAppointment }: AppointmentButtonProps) {

  return (
    <div>
      <button onClick={makeAppointment}
      className="bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/60 rounded-md px-5 py-1 flex items-center space-x-2">
        <img src={appointmentIcon}></img>
        <div>จองคิว</div>
      </button>
    </div>
  )
}