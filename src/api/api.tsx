import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import "./Products.scss"

import { MenuItem } from "../interfaces/food-data";


function Products() {


    const { data } = useQuery<MenuItem>("products", () => {
        return axios
            .get<MenuItem>("https://cdn-dev.preoday.com/challenge/menu")
            .then((response) => response.data);
    });

    }


export default Products;