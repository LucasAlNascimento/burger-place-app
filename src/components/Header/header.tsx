export default function Header() {
    return (
        <main className="flex flex-col">
            <header className="flex items-center justify-center bg-[#4F372F] text-white h-16 z-10">
                <h1>Menu</h1>
            </header>
            <div className="relative flex items-center justify-center w-full h-[150px] -z-0 overflow-hidden">
                <img src="public/assets/burger.jpeg" alt="burger" className="absolute w-full h-full scale-[200%] opacity-90 object-cover"/>
                <img src="public/assets/logo.png" alt="logo" className="absolute w-52 opacity-85"/>

            </div>
        </main>
    );
}