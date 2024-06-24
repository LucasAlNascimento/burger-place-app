import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/slice/search";

import { IoSearch } from "react-icons/io5";


export default function Search() {

    const dispatch = useDispatch();

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <div className="flex w-full px-5 lg:px-0 justify-center items-center">
            <div className="w-full translate-y-5 rounded-lg border-gray-400 border lg:max-w-5xl">
                <form
                    className="flex flex-row justify-center items-center ml-4"
                >
                    <i className="text-gray-400 text-2xl"><IoSearch /></i>
                    <input
                        className="w-full h-10 px-6 rounded-full bg-transparent text-md outline-none"
                        type="text"
                        placeholder="Search menu items"
                        onChange={searchChange}
                    />
                </form>
            </div>
        </div>
    );
}