import { useEffect, useRef, useState } from "react"

import LineIcon from "../../Icons/line.svg"
import PriceIcon from "../../Icons/price-icon.svg"
import PriceSelectorOverlay from "./PriceSelectorOverlay"
interface PriceSelectorProps {
  searchFortuneTeller: SearchFortuneTeller
  setSearchFortuneTeller: (searchFortuneTeller: SearchFortuneTeller) => void
}
export default function PriceSelector({ searchFortuneTeller, setSearchFortuneTeller }: PriceSelectorProps): JSX.Element{
  const [openPriceSelector, setOpenPriceSelector] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const closePriceSelector = (event: MouseEvent):void => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node) &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
    ) {
      setOpenPriceSelector(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closePriceSelector)
    return () => {
      document.removeEventListener("mousedown", closePriceSelector)
    }
  }, [])

  useEffect(() => {
    if (!openPriceSelector)
      setSearchFortuneTeller({
        ...searchFortuneTeller,
        minPrice: Math.min(searchFortuneTeller.minPrice, searchFortuneTeller.maxPrice),
        maxPrice: Math.max(searchFortuneTeller.minPrice, searchFortuneTeller.maxPrice)
      })
  }, [searchFortuneTeller.minPrice, searchFortuneTeller.maxPrice, openPriceSelector])

  return (
    <div className="w-[13%]">
      <div
        ref={selectorRef}
        onClick={() => setOpenPriceSelector(!openPriceSelector)}
        className="w-full h-[36px] px-6 rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-between cursor-pointer"
      >
        <div className="w-[80%] flex items-center justify-center">
          {(searchFortuneTeller.minPrice <= 0 && searchFortuneTeller.maxPrice <= 0) ||
          searchFortuneTeller.minPrice > searchFortuneTeller.maxPrice ? (
              <p className="text-white/70 text-base font-sans font-medium truncate">เลือกราคา</p>
            ) : (
              <p className="text-white text-base font-sans font-medium truncate">
                <p className="text-white text-base font-sans font-medium truncate">
                  {searchFortuneTeller.minPrice < searchFortuneTeller.maxPrice
                    ? `${searchFortuneTeller.minPrice < 0 ? 0 : searchFortuneTeller.minPrice} ถึง ${
                      searchFortuneTeller.maxPrice
                    }`
                    : searchFortuneTeller.maxPrice}
                </p>
              </p>
            )}
        </div>
        <div className="w-[20%] flex flex-row items-center">
          <img src={LineIcon} alt="line-icon" className="h-8 translate-y-1 mr-1" />
          <img src={PriceIcon} alt="price-icon" className="w-[22px] h-[22px]" />
        </div>
      </div>
      {openPriceSelector && (
        <div ref={overlayRef} className="absolute w-[25%] translate-y-[0.5rem] -translate-x-[25%]">
          <PriceSelectorOverlay
            minPrice={searchFortuneTeller.minPrice}
            maxPrice={searchFortuneTeller.maxPrice}
            setMinPrice={(minPrice: number) => {
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                minPrice: minPrice
              })
            }}
            setMaxPrice={(maxPrice: number) => {
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                maxPrice: maxPrice
              })
            }}
          />
        </div>
      )}
    </div>
  )
}
