export default function ReportChoice(props: {
  id: string
  description: string
  reportId: string
  setReportId: React.Dispatch<React.SetStateAction<string>>
  reportDescription: string
  setReportDescription: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}) {
  const chooseThisChoice = () => {
    if (props.id == "others") {
      props.setReportId(props.id)
      props.setReportDescription(props.text)
      return
    }
    props.setReportId(props.id)
    props.setReportDescription(props.description)
  }

  const fillText = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setText(event.target.value)
    props.setReportId(props.id)
    props.setReportDescription(event.target.value)
  }

  return (
    <div>
      <label className="cursor-pointer block relative">
        <input
          type="radio"
          name="report-type"
          id={props.id}
          value={props.id}
          className="opacity-0 h-0 w-0 cursor-pointer"
          onChange={chooseThisChoice}
        />
        <span className="absolute top-0 left-0 w-[1.5vw] h-[1.5vw] bg-transparent border-2 border-mdd-almost-black rounded-full flex justify-center items-center">
          <span
            className={`absolute w-[1vw] h-[1vw] rounded-full ${
              props.reportId == props.id ? "bg-mdd-sand-yellow" : "bg-transparent"
            }`}
          />
        </span>
        <span className="pl-[1.75vw]">{props.description}</span>
        {props.id == "others" && (
          <input
            className="bg-transparent ml-[0.5vw]"
            type="text"
            id="description"
            placeholder="โปรดระบุ................"
            value={props.text}
            required={props.reportId == "others"}
            onChange={fillText}
          />
        )}
      </label>
    </div>
  )
}
