import { useRef } from "react"
import SearchIcon from "../Icons/search-icon.svg"

interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
  setIsSubmit: (isSubmit: boolean) => void
}

export default function SearchBox({
  searchFortuneTeller,
  setSearchFortuneTeller,
  setIsSubmit
}: Props) {
  const inputSearchBoxRef = useRef<HTMLInputElement>(null)
  const handleInputClick = () => {
    setIsSubmit(false)
  }

  const inputFocus = () => {
    inputSearchBoxRef.current?.focus()
  }

  return (
    <div className="w-[25%] relative">
      <input
        type="text"
        ref={inputSearchBoxRef}
        value={searchFortuneTeller.name}
        className="w-full h-9 pl-12 rounded-full bg-[#D9D9D9]/[0.75] text-white font-sans font-medium"
        onClick={handleInputClick}
        onSubmit={() => setIsSubmit(true)}
        onChange={(e) => setSearchFortuneTeller({ ...searchFortuneTeller, name: e.target.value })}
      />
      <img
        src={SearchIcon}
        alt="Search Icon"
        className="absolute top-1 left-2 mt-1 ml-2 h-5 w-5"
        onClick={inputFocus}
      />
      {!searchFortuneTeller.name ? (
        <h1
          className="text-white/70 text-base font-sans font-medium absolute top-1.5 left-12"
          onClick={inputFocus}
        >
          ค้นหาชื่อหมอดู
        </h1>
      ) : null}
    </div>
  )
}
