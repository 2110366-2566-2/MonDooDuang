import NavBar from "../../common/components/NavBar/NavBar"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import ExamplePage from "./ExamplePage"

export default function ExampleApp() {
  return (
    <RootLayout>
      <NavBar isFortuneTeller={true} menuFocus={"search"} username={"Username"} />
      <ExamplePage />
    </RootLayout>
  )
}
