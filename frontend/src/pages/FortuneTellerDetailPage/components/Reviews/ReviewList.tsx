import UserIcon from "./UserIcon"
import RatedStar from "../FortuneTellerDetails/RatedStar"

export default function ReviewList() {
    return (
        <div className="flex flex-row items-end min-w-[380px]">
            <UserIcon></UserIcon>
            <div className="flex flex-col">
                <div className="flex flex-col space-y-3 border-[1px] border-white rounded-r-lg rounded-t-lg px-6 py-4 w-[300px] h-[200px]">
                    <div className="flex flex-row space-x-4">
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                    </div>
                    <div className="text-mdd-link-yellow">คะแนน : 4.9 / 5</div>
                    <div className="text-wrap text-balance break-words leading-[1.5em] truncate max-h-[3em]">
                    จูเนียร์ สไตรค์ม็อบ ชัตเตอร์โก๊ะโอเคอยุติธรรม คอรัปชั่นม็อบสต๊อคซีอีโllllllอลิมิeeeeeต สัมนาพรีเมียมสปายเอ็นจีโอ เมาท์สเก็ตช์แบคโฮฮัม ซัพพลายเออร์รามาธิบดี ตุ๊ดมิลค์เคลียร์หลวงปู่คอมเมนต์ ทีวีเคลื่อนย้ายเดอะ เปเปอร์สเก็ตช์เฟรชถ่ายทำคอมเมนต์ แดนซ์ ศิรินทร์กู๋ล็อบบี้โนติสอะ ซิงน็อคสะเด่า จัมโบ้ ตุ๊ก ซิตี้โกะอุปสงค์อัลตรา
                    </div>
                    <div>2 Days ago</div>
                </div>
                <div>Username : สาววายท่านนี้กำลังฟริน</div>
            </div>
        </div>
    )
}