import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/slice/Search";

export default function Search() {

    const dispatch = useDispatch();

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <div className="w-auto mx-5 translate-y-5 rounded-lg border-gray-400 border">
            <form
                className="flex flex-row justify-center items-center ml-4"
            >
                <i className="text-gray-400">P</i>
                <input
                    className="w-full h-10 px-6 rounded-full bg-transparent text-md outline-none"
                    type="text"
                    placeholder="Search menu items"
                    onChange={searchChange}
                />

            </form>
        </div>
    );
}