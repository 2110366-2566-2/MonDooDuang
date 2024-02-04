import { useState } from "react"

export default function ReportChoice(props: {
  id: string
  value: string
  description: string
  report: string[]
  setReport: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [text, setText] = useState("")
  const chooseThisChoice = () => {
    if (props.value == "others") return props.setReport([props.value, text])
    props.setReport([props.value, props.description])
  }

  const fillText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    props.setReport([props.value, event.target.value])
  }

  return (
    <div>
      <label className="cursor-pointer block relative">
        <input
          type="radio"
          name="report-type"
          id={props.id}
          value={props.value}
          className="opacity-0 h-0 w-0 cursor-pointer"
          onChange={chooseThisChoice}
        />
        <span className="absolute top-0 left-0 w-[1.5vw] h-[1.5vw] bg-transparent border-2 border-mdd-almost-black rounded-full flex justify-center items-center">
          <span
            className={`absolute w-[1vw] h-[1vw] rounded-full ${
              props.report[0] == props.value ? "bg-mdd-sand-yellow" : "bg-transparent"
            }`}
          />
        </span>
        <span className="pl-[1.75vw]">{props.description}</span>
        {props.value == "others" && (
          <input
            className="bg-transparent ml-[0.5vw]"
            type="text"
            id="description"
            placeholder="โปรดระบุ................"
            required={props.report[0] == "others"}
            onChange={fillText}
          />
        )}
      </label>
    </div>
  )
}
