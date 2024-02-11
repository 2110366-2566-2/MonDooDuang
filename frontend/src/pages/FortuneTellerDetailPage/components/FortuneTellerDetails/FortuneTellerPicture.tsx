import ShadowEffect from "../../../../assets/fortunTellerDetailsAsssets/shadowEffect.png"

export default function FortuneTellerPicture({ profile }: { profile: string }) {
    return (
      <div className="ml-[-100px] mt-[50px] relative object-fill w-[250px] h-[250px] flex">
        <img className="absolute top-0 left-0 rounded-full shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-white w-[250px] h-[250px]"
        src={profile}></img>
        <img className="object-fill relative top-0 left-0 rounded-full"
          src={ShadowEffect}></img>
      </div>
    )
  }