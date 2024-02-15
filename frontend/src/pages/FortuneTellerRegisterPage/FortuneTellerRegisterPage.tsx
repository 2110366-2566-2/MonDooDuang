import FormRegister from "./components/Form/FormRegister"
import Logo from "../../assets/FortuneTellerRegisterAssets/Logo.svg"
import RootLayout from "../../common/components/RootLayout/RootLayout"

export default function FortuneTellerRegisterPage() {
  const mockUserId = "aad3b8fc-bb5f-46a5-b2c5-541f1f4c6a5b"
  return (
    <RootLayout>
      <div className="z-50 flex flex-col items-center relative text-white font-noto-sans">
        <img className="z-50 flex flex-col items-center mt-7 absolute" src={Logo} />
        <div className="bg-transparent bg-black -z-[78] rounded-3xl border my-20 w-11/12 ">
          <h1 className="font-semibold text-4xl text-center mt-24">ยืนยันตัวตน</h1>
          <div className="ml-36 pb-12">
            <FormRegister userId={mockUserId} />
          </div>
        </div>
      </div>
    </RootLayout>
  )
}
