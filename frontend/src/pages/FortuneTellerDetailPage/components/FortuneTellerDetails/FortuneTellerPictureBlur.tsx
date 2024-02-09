import DemoProfilePic from "../../../../assets/fortunTellerDetailsAsssets/demoProfilePicture.png"

export default function FortuneTellerPictureBlur() {
    return (
      <div className="relative object-fill w-[270px] h-[270px] flex blur-sm">
        <img className="absolute top-0 left-0 rounded-full shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-white w-[270px] h-[270px]"
        src={DemoProfilePic}></img>
      </div>
    )
  }