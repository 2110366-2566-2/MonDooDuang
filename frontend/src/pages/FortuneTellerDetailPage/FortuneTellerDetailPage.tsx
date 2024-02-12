import { environment } from "../../common/constants/environment"

export default function FortuneTellerDetailPage() {
  return (
    <div>
      <h1>Fortune Teller Detail Page</h1>
      <button
        onClick={() => {
          window.location.href = environment.frontend.url + "/appointment"
        }}
        className="p-2 bg-red-200"
      >click me</button>
    </div>
  )
}
