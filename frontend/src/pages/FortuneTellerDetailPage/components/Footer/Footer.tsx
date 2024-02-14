import footer from "../../../../assets/fortuneTellerDetailsAssets/footer.png"

export default function Footer(){
  return (
    <div className="grid object-center justify-center">
      <div className="relative">
        <a className="absolute text-center text-[40px] w-[100%] z-20"  href="/search">กลับสู่หน้าหลัก</a>
        <h2 className="text-center text-[40px] relative z-10 blur-sm">กลับสู่หน้าหลัก</h2>
      </div>
      <img src={footer} className="object-contain relative z-0 mt-[-56px] "></img>
    </div>
  )
}