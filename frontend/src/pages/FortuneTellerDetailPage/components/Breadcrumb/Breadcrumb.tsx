import Arrow from "./Arrow"

export default function Breadcrumb() {
  function refreshPage() {
    window.location.reload()
  }
  return (
    <nav className = "flex content-center text-[20px] font-light gap-[10px]">
      <a className= "inline-flex items-center" href="/search">
        หน้าหลัก
      </a>
      <Arrow></Arrow>
      <button className="text-mdd-focus-yellow flex items-center" onClick={refreshPage}>
        รายละเอียดเพิ่มเติม
      </button>
    </nav>
  )
}