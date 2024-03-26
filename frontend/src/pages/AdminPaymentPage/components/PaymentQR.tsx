import generatePayload from "promptpay-qr"
import qrcode from "qrcode"
import { PaymentQRProps } from "../types/AdminPaymentTypes"
import parse from 'html-react-parser'

export function PaymentQR(props: PaymentQRProps) {
  const { phoneNumber, amount } = props
  const payload = generatePayload(phoneNumber, { amount })

  // Convert to SVG QR Code
  const options = { type: "svg", color: { dark: "#000", light: "#fff" } }
  let res = ""
  qrcode.toString(payload, options, (err, svg) => {
    if (err) throw err
    res = svg
  })
  return <div className="w-3/4">{parse(res)}</div>
}
