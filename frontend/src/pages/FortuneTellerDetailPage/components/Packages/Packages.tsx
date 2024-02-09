import PackageList from "./PackageList"

export default function Packages() {

    return (
        <div className="border-white border-[1px] w-[50%] min-w-[500px] sm:rounded-lg flex justify-center">
            <table className="w-full">
                <thead className="text-[40px] font-libre-bodoni text-center leading-loose">Packages</thead>
                <tbody>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                    <PackageList></PackageList>
                </tbody>
            </table>
        </div>
    )
  }