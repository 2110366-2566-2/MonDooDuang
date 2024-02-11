import Form from "./components/Form/Form"
import Logo from "../../assets/FortuneTellerAccountAssets/Logo.svg"
export default function FortuneTellerAccountPage() {
  return (
    <div className="bg-black h-full w-full text-white">
      <div className="z-50 flex flex-col items-center relative">
        <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />
        <div className="bg-transparent bg-black -z-[78] rounded-3xl border my-20 w-11/12 ">
          <Form></Form>
        </div>
      </div>
    </div>
  )
}
