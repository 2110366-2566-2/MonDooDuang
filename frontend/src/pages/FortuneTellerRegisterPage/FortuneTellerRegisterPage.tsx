import FrameRegister from "../../assets/FortuneTellerRegisterAssets/FrameRegister.svg"
import Background from "../../assets/FortuneTellerRegisterAssets/Background.png"
import FormRegister from "./components/Form/FormRegister"

export default function FortuneTellerRegisterPage() {
  return (
    <div
      className="text-white bg-black bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div
        style={{ backgroundImage: `url(${FrameRegister})` }}
        className=" bg-no-repeat w-11/12 mx-auto items-center justify-center"
      >
        <div className="flex flex-col pt-36">
          {/* <div> */}
          <h1 className="font-semibold text-4xl text-center">ยืนยันตัวตน</h1>
          <div className="ml-36 pb-24">
            <FormRegister></FormRegister>
          </div>
        </div>
      </div>
    </div>
  )
}
