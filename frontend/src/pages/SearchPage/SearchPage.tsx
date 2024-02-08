import FortuneTellerSearchModal from "./components/FortuneTellerSearchModal/FortuneTellerSerachModal"

export default function SearchPage() {
  const ft = {
    name: "DaengDooDuang",
    rating: 4.7,
    minPrice: 100,
    maxPrice: 300,
    image: "image",
    tags: ["ไพ่ทาโร่", "ไพ่"],
    chat: () => {},
    moreInformation: () => {},
    makeAppointment: () => {}
  }
  return (
    <div className="bg-black w-screen h-screen">
      <div className="grid gap-0 grid-cols-4 justify-items-center mx-10">
        {[...Array(8)].map((_, i) => (
          <FortuneTellerSearchModal key={i} {...ft} />
        ))}
      </div>
    </div>
  )
}
