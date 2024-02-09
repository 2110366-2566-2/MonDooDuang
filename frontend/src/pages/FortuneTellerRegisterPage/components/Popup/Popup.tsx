import CompleteIcon from "../../../../assets/FortuneTellerRegisterAssets/CompleteIcon.png"

export default function popup() {
  return (
    <div className="overlay">
      <div className="flex flex-col w-1/3 h-64 bg-[#E8E8E8] rounded-3xl items-center m-auto">
        <img src={CompleteIcon} className="size-20 mt-6" />
        <h1 className="text-[#0C0000] text-3xl font-medium mt-2">สร้างบัญชีผู้ใช้ใหม่สำเร็จ</h1>
        <button
          type="submit"
          className="mt-5 w-32 h-12 text-2xl font-semibold rounded-xl bg-[#AEAEAE]"
        >
          ตกลง
        </button>
      </div>
    </div>
  )
}
