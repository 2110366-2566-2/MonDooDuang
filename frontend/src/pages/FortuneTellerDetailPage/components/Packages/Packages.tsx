import PackageList from "./PackageList"

export default function Packages() {

    return (
        <div className="border-white border-[1px] w-[50%] sm:rounded-lg ">
            <table className="w-full">
                <thead className="text-[40px] font-libre-bodoni text-center leading-loose">Packages</thead>
                <tbody>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                </tbody>
            </table>
        </div>
    )
  }