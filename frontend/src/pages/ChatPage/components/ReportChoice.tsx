export default function ReportChoice(props: { id: string; value: string; description: string }) {
  return (
    <div>
      <label className="cursor-pointer block relative">
        <input
          type="radio"
          name="report-type"
          id={props.id}
          value={props.value}
          className="opacity-0 h-0 w-0 cursor-pointer"
        />
        <span className="absolute top-0 left-0 w-[1.5vw] h-[1.5vw] bg-transparent border-2 border-mdd-almost-black rounded-full flex justify-center items-center">
          <span className="absolute w-[1vw] h-[1vw] rounded-full" />
        </span>
        <span className="pl-[1.75vw]">{props.description}</span>
        {props.value == "others" && (
          <input
            className="bg-transparent"
            type="text"
            id="description"
            placeholder="โปรดระบุ................"
          />
        )}
      </label>
    </div>
  )
}
