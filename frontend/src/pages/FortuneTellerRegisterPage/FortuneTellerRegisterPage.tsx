import FormRegister from "./components/Form/FormRegister"
import Logo from "../../assets/FortuneTellerRegisterAssets/Logo.svg"

export default function FortuneTellerRegisterPage() {
  return (
    <div className="h-full w-full bg-black flex flex-col items-center">
      <div className="flex w-[30%]">
        <div className="z-10 w-[30%] bg-gradient-to-l from-black" />
        <div className="z-10 w-[40%] justify-center flex bg-black">
          <img className="mt-4" src={Logo} />
        </div>
        <div className="z-10 w-[30%] bg-gradient-to-r from-black" />
      </div>
      <div className="flex flex-col mt-11 mb-0 text-white size-11/12">
        <h1 className="font-semibold text-4xl text-center">ยืนยันตัวตน</h1>
        <div className="ml-36 pb-24">
          <FormRegister></FormRegister>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
