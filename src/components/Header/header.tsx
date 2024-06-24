export default function Header() {
    return (
        <main className="flex flex-col">
            <header className="flex items-center justify-center bg-[#4F372F] text-white text-lg h-16 lg:gap-x-48">
                <h1 className="lg:hidden">Menu</h1>
                <h1 className="hidden lg:block lg:relative lg:cursor-pointer">
                    MENU
                <div className="hidden lg:block lg:absolute lg:w-[232px] lg:h-[5px] lg:bg-white lg:right-0 lg:-left-[90px] lg:top-10 "></div>
                </h1>
                <h1 className="hidden lg:block lg:relative lg:cursor-pointer">
                    ENTRAR
                </h1>
                <h1 className="hidden lg:block lg:relative lg:cursor-pointer">
                    CONTATO
                </h1>
            </header>
            <div className="relative flex items-center justify-center w-full h-[150px] -z-0 overflow-hidden lg:h-[200px]">
                <img src="/assets/burger.jpeg" alt="burger" className="absolute w-full h-full scale-[190%] opacity-90 object-cover mb-14 lg:scale-100"/>
                <img src="/assets/logo.png" alt="logo" className="absolute w-52 opacity-85 lg:mb-8 lg:scale-110 "/>
            </div>
        </main>
    );
}