import appointmentIcon from "../../../../assets/fortunTellerDetailsAsssets/appointmentIcon.svg"

export default function AppointmentButton() {

    return (
        <div>
            <button className="bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/60 rounded-md px-5 py-1 flex items-center space-x-2">
            <img src={appointmentIcon}></img>
            <div>จองคิว</div>
            </button>
        </div>
    )
  }