import { useState } from "react";
import DessertsData from "../../data/desserts-data";
import DrinksData from "../../data/drinks-data";
import HamburguerData from "../../data/hamburguer-data";

export default function Navigation() {
    const [activeCategory, setActiveCategory] = useState<string>('hamburguer');

    const categoryChange = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className="flex flex-col mt-16 gap-14">
            <nav>
                <ul className="w-full flex items-center justify-center mx-5 gap-24">
                    <li className={activeCategory === 'hamburguer' ? 'active' : ''}>
                        <button onClick={() => categoryChange('hamburguer')}>
                            <div className="flex  items-center justify-center border-2 border-black relative w-32 h-32 rounded-full">
                                <div className="relative w-[118px] h-[118px] rounded-full overflow-hidden">
                                    <img src="public/assets/burgernavigation.jfif" alt="hamburguer" className="absolute left-1 scale-[160%] w-full h-auto" />
                                </div>
                            </div>
                        </button>
                    </li>
                    <li className={activeCategory === 'drinks' ? 'active' : ''}>
                        <button onClick={() => categoryChange('drinks')}>
                            <img src="public/assets/drinksnavigation.png" alt="hamburguer" />
                        </button>
                    </li>
                    <li className={activeCategory === 'sobremesas' ? 'active' : ''}>
                        <button onClick={() => categoryChange('sobremesas')}>
                            <img src="public/assets/dessertsnavigation.jfif" alt="hamburguer" />
                        </button>
                    </li>
                </ul>
            </nav>
            {activeCategory === 'hamburguer' && <HamburguerData />}
            {activeCategory === 'drinks' && <DrinksData />}
            {activeCategory === 'sobremesas' && <DessertsData />}
        </div>
    );
}
