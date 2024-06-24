import { useState } from "react";
import Desserts from "../../data/desserts";
import Drinks from "../../data/drinks";
import Hamburguer from "../../data/hamburguer";

export default function Navigation() {
    const [activeCategory, setActiveCategory] = useState<string>('hamburguer');

    const categoryChange = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className="flex flex-col mt-16 gap-14">
            <nav>
                <ul className="w-full flex items-center justify-center gap-8">
                    <li className={activeCategory === 'hamburguer' ? 'active' : ''}>
                        <button onClick={() => categoryChange('hamburguer')}>
                            <div className={`flex items-center justify-center relative w-28 h-28 rounded-full ${activeCategory === 'hamburguer' ? 'border-2 border-black' : ''}`}>
                                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                    <img src="/assets/burgernavigation.jfif" alt="hamburguer" className="absolute left-1 scale-[160%] w-full h-auto" />
                                </div>
                            </div>
                            <h2 className={`mt-5 ${activeCategory === 'hamburguer' ? 'font-bold pb-4 border-b-2 border-black' : ''}`}>Burguers</h2>
                        </button>
                    </li>
                    <li className={activeCategory === 'drinks' ? 'active' : ''}>
                        <button onClick={() => categoryChange('drinks')}>
                            <div className={`flex items-center justify-center relative w-28 h-28 rounded-full ${activeCategory === 'drinks' ? 'border-2 border-black' : ''}`}>
                                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                    <img src="/assets/drinksnavigation.png" alt="drinks" className="absolute top-1 scale-[190%] w-full h-auto" />
                                </div>
                            </div>
                            <h2 className={`mt-5 ${activeCategory === 'drinks' ? 'font-bold pb-4 border-b-2 border-black' : ''}`}>Drinks</h2>
                        </button>
                    </li>
                    <li className={activeCategory === 'desserts' ? 'active' : ''}>
                        <button onClick={() => categoryChange('desserts')}>
                            <div className={`flex items-center justify-center relative w-28 h-28 rounded-full ${activeCategory === 'desserts' ? 'border-2 border-black' : ''}`}>
                                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                    <img src="/assets/dessertsnavigation.jfif" alt="desserts" className="absolute bottom-1 left-1 scale-[110%] w-full h-auto z-0" />
                                </div>
                            </div>
                            <h2 className={`mt-5 ${activeCategory === 'desserts' ? 'font-bold pb-4 border-b-2 border-black' : ''}`}>Desserts</h2>
                        </button>
                    </li>
                </ul>
            </nav>
            {activeCategory === 'hamburguer' && <Hamburguer />}
            {activeCategory === 'drinks' && <Drinks />}
            {activeCategory === 'desserts' && <Desserts />}
        </div>

    );
}
