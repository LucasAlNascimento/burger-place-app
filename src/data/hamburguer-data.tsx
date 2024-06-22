import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMenu } from "../redux/slice/menu";

export default function HamburguerData() {

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.menu);

    console.log("State", state);
    
    return (
        <div>
            <h2>Hambúrgueres</h2>
            <p>Lista de hambúrgueres...</p>
            <button onClick={() => dispatch(fetchMenu())} className="border-4 border-black bg-green-500">Fetch Hamburguers</button>
        </div>
    );
}




