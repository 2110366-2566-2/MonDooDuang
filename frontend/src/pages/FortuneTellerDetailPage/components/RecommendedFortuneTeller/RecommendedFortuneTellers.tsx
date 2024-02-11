import LeftLine from "../Line/LeftLine"
import RightLine from "../Line/RightLine"

export default function RecommendedFortuneTellers() {
    return (
        <div>
            <div className="flex flex-row space-x-4 items-center justify-center">
                <LeftLine></LeftLine>
                <div className="font-medium text-[24px]">คุณอาจสนใจหมอดูเหล่านี้</div>
                <RightLine></RightLine>
            </div>
            <div className="flex flex-row  scroll-smooth overflow-auto space-x-4">
                <div className="h-[430px] w-[300px]"> รอก้าดจากพพ</div>
            </div>
        </div>
    )
}