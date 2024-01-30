import Arrow from "./Arrow"
import { Link } from 'react-router-dom'

export default function Breadcrumb() {
    function refreshPage() {
      window.location.reload();
    }
    return (
      <nav>
      <Link className="breadcrumb-font" to="/">
        หน้าหลัก
      </Link>
      <Arrow></Arrow>
      <button className="breadcrumb-font" onClick={refreshPage}>
        รายละเอียดเพิ่มเติม
      </button>
    </nav>
    )
  }