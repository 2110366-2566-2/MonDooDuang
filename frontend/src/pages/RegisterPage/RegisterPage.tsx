import CameraIcon from "./components/Icon/CameraIcon"

export default function RegisterPage() {
  return (
    <div className="flex justify-center h-[1000px] w-full bg-[#000000]">
      <img className="absolute top-3" src="img/RegisterPage/registerFrame.png" />
      <div className="absolute flex mt-32 flex-col items-center text-white gap-5">
        <p className="text-[38px] font-medium">สร้างบัญชีใหม่</p>
        <div className="flex">
          <div className="flex w-[506px] flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center bg-text-field rounded-full w-[146px] h-[146px]">
              <CameraIcon />
            </div>
            <p>
              <span className="text-2xl">รูปโปรไฟล์ </span>(ไม่จำเป็น)
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="ml-3 text-2xl">ชื่อจริง*</p>
            <textarea className="px-7 py-2 text-[22px] w-[584px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
            <p className="ml-3 mt-3 text-2xl">นามสกุล*</p>
            <textarea className="px-7 py-2 text-[22px] w-[584px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
        </div>
        <div className="flex w-[1090px] justify-between">
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">วัน เดือน ปี เกิด*</p>
            <textarea className="px-7 py-2 text-[22px] w-[279px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">เบอร์โทรศัพท์*</p>
            <textarea className="px-7 py-2 text-[22px] w-[279px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">เพศ*</p>
            <div className="flex w-[460px] justify-between items-center h-[50px]">
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  className="w-[25px] h-[25px] appearance-none rounded-full border border-2 border-white checked:bg-yellow-radio-button"
                />
                <label htmlFor="female" className="ml-2 text-2xl">
                  ชาย
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  className="w-[25px] h-[25px] appearance-none rounded-full border border-2 border-white checked:bg-yellow-radio-button"
                />
                <label htmlFor="female" className="ml-2 text-2xl">
                  หญิง
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="LGBTQA+"
                  type="radio"
                  name="gender"
                  className="w-[25px] h-[25px] appearance-none rounded-full border border-2 border-white checked:bg-yellow-radio-button"
                />
                <label htmlFor="LGBTQA+" className="ml-2 text-2xl">
                  LGBTQA+
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="preferNotToSay"
                  type="radio"
                  name="gender"
                  className="w-[25px] h-[25px] appearance-none rounded-full border border-2 border-white checked:bg-yellow-radio-button"
                />
                <label htmlFor="preferNotToSay" className="ml-2 text-2xl">
                  ไม่ระบุ
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[1090px] justify-between">
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">อีเมล*</p>
            <textarea className="px-7 py-2 text-[22px] w-[455px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">รหัสผ่าน*</p>
            <textarea className="px-7 py-2 text-[22px] w-[271px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">ยืนยันรหัสผ่าน*</p>
            <textarea className="px-7 py-2 text-[22px] w-[271px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
        </div>
        <p className="text-[38px] font-medium mt-2">กรอกข้อมูลบัตร</p>
        <div className="flex w-[1090px] justify-between">
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">เลขที่บัญชี*</p>
            <textarea className="px-7 py-2 text-[22px] w-[455px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
          <div className="flex flex-col items-start">
            <p className="ml-3 text-2xl">ธนาคาร*</p>
            <textarea className="px-7 py-2 text-[22px] w-[581.5px] h-[50px] rounded-[10px] resize-none bg-text-field"></textarea>
          </div>
        </div>
        <div className="mt-5 text-center self-end w-[123px] h-[50px] rounded-[10px] bg-white">
          <p className="my-3 text-[#3B3B3B] text-2xl font-semibold">เสร็จสิ้น</p>
        </div>
      </div>
    </div>
  )
}
