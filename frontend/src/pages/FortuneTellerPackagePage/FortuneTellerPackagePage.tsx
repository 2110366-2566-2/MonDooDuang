import Logo from "../../assets/FortuneTellerPackageAssets/Logo.svg"
import Form from "./components/Form/Form"

export default function FortuneTellerPackagePage() {
  return (
    <div className="bg-black h-full w-full">
      <div className="z-50 flex flex-col items-center relative">
        <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />

        <div className="bg-transparent bg-black -z-[78] rounded-3xl border my-20 h-5/6 w-11/12 ">
          <Form></Form>
        </div>
      </div>
    </div>
  )
}
