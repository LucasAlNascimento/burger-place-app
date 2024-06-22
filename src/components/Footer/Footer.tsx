export default function Footer() {
    return (
        <footer className="flex flex-col">
            <div className="flex flex-col items-center justify-center w-full h-16 px-6 bg-gray-100 border border-gray-200">
                <div className="flex items-center justify-center w-full bg-white rounded-lg font-bold underline">View allergy information</div>
            </div>
            <div>
                <div className="flex w-full h-20 bg-gray-100 px-6 pt-2 pb-6">
                    <button className="w-full items-center justify-center h-12 bg-[#4F372F] rounded-3xl text-white">{`Your basket •  item`}</button>
                </div>
            </div>
        </footer>
    )
}