import StarCornerIcon from "../icons/starcorner-icon.svg"

export default function StarCorner() {
  return (
    <span className="flex justify-between p-3">
      <img src={StarCornerIcon} alt="Logo Icon" className="bg-cover w-4 h-5" />
      <img src={StarCornerIcon} alt="Logo Icon" className="bg-cover w-4 h-5" />
    </span>
  )
}
