import Header from "../../components/Header/header";
import Search from "../../components/Search/search";
import Navigation from "../../components/Navigation/navigation";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Header />
            <Search />
            <Navigation />
        </div>
    );
}