import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Header />
            <Search />
            <Navigation />
            <Footer />
        </div>
    );
}