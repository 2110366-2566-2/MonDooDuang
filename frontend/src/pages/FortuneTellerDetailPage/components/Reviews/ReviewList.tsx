import UserIcon from "./UserIcon"
import RatedStar from "../FortuneTellerDetails/RatedStar"

export default function ReviewList() {
    return (
        <div className="flex flex-row items-end min-w-[380px]">
            <UserIcon></UserIcon>
            <div className="flex flex-col">
                <div className="flex flex-col border-[1px] border-white rounded-r-lg rounded-t-lg">
                    <div className="flex flex-row space-x-2">
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                    </div>
                    <div className="text-mdd-link-yellow">คะแนน : 4.9 / 5</div>
                    <div>หมาแดงกับพี่สาวคนสวยอร่อยมาก สวบไม่พัก ใครก็ได้แต่งฟิคหน่อย</div>
                    <div>2 Days ago</div>
                </div>
                <div>Username : สาววายท่านนี้กำลังฟริน</div>
            </div>
        </div>
    )
}