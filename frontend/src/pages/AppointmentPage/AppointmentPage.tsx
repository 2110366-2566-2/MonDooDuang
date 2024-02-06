import AppointmentPanel from "./components/AppointmentPanel";

// import { ConfirmModal } from "./components/ConfirmModal";
// import { SuccessModal } from "./components/SuccessModal";

export default function AppointmentPage() {
  return (
    <div className="flex justify-center bg-red-200">
      {/* <SuccessModal/> */}
      {/* <ConfirmModal isVisible={isOpen} onClose={() => setIsOpen(false)}/> */}
      {/* <button className="p-3 bg-zinc-200 rounded-md" onClick={() => setIsAppointmentPanelOpen(true)}>press me</button> */}
      <AppointmentPanel/>
    </div>
  )
}