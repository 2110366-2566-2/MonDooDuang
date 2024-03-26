import UpcomingEvent from '../../icons/upcoming-event.svg'
import CompletedEvent from '../../icons/completed-event.svg'
interface AppointmentToggleButtonProps {
    toggle: string;
    handleToggle: () => void;
  }

export default function AppointmentToggleButton({toggle, handleToggle}:AppointmentToggleButtonProps): JSX.Element {
  return (
    <div className="flex flex-row place-items-center w-[140px] h-[48px] bg-[#D9D9D9]/[.39] cursor-pointer select-none text-white leading-4 rounded-full shadow-inner" onClick={handleToggle}>
      <div className={`w-[40px] h-[40px] rounded-full bg-white shadow-mg mx-[4px] transition-transform duration-[400ms] ease-in-out ${
        toggle !== 'upcoming' ? 'transform translate-x-[92px]' : 'transform translate-x-0'
      }`}>
        <img src={toggle === 'upcoming' ? UpcomingEvent : CompletedEvent} alt='event' className='w-[24px] h-[24px] m-[8px]'/>
      </div>
      <div className={`w-[80px] h-[40px] flex items-center justify-center transition-transform duration-300 ease-in-out ${
        toggle !== 'upcoming' ? 'transform -translate-x-[38px]' : 'transform translate-x-0'
      }`}>
        <p className={`text-[15px] font-medium mx-3 ${toggle === 'upcoming'? "text-left" : "text-right"}`}>{toggle === 'upcoming' ? 'upcoming\nevent' : 'completed\nevent'}</p>
      </div>
    </div>
  )
}