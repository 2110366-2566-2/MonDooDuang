import background from "../../../assets/images/common/background.png"

export default function RootLayout({ children }: { children?: any }) {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-black bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="relative w-full top-0 left-0">{children}</div>
    </div>
  )
}
