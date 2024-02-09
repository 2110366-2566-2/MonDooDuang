interface Props {
  setIsSubmit: (isSubmit: boolean) => void
}

export default function SubmitButton({ setIsSubmit }: Props) {
  return (
    <button
      className="w-[5%] h-9 bg-[#FFDB5E] rounded-full text-[#4B4B4B] 
    font-sans text-base font-bold hover:drop-shadow-[2px_2px_4px_#939393] 
    hover:scale-105 transition-all duration-200 ease-in-out"
      onClick={() => setIsSubmit(true)}
    >
      ค้นหา
    </button>
  )
}
