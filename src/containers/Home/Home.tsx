import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Basket from "../../components/Basket/Basket";

export default function Home() {
    return (
        <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
            <div className="lg:w-full">
                <Header />
                <Search />
            </div>
            <div className="lg:relative lg:flex lg:w-[1024px] lg:h-[1337px] lg:bg-gray-100 lg:mt-7">
                <div className="lg:w-[600px] lg:h-[1071px] lg:ml-4 lg:mt-5 lg:shadow-[0px_2px_14px_0px_rgba(0,0,0,0.14)] lg:bg-white">
                    <Navigation />
                    <div className="hidden lg:block"><Basket /></div>
                </div>
            </div>
            <div className="lg:hidden">
                <Footer />
            </div>
        </div>
    );
}