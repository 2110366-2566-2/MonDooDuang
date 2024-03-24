export default function Redirect({ to }: { to: string }) {
  window.location.href = `${to}`
  return <></>
}
