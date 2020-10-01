import React, {useState, createContext, useContext, useEffect} from "react";
import axios from "axios";

const CountryContext = createContext();

export const CountryProvider = ({children}) => {
    const [country, setCountry] = useState(false);
    const [allCoutrysCaptals, setAllCoutrysCaptals] = useState([]);
    const [countrys, setCountrys] = useState([]);
    const [countryFilters, setCountryFilters] = useState([]);

    const getCountry = async () => {
        axios.get('https://restcountries.eu/rest/v2/region/americas')
            .then(res => {
                const response = res.data;
                setAllCoutrysCaptals(response);
            });
    };

    useEffect(() => {
        getCountry().then(r => r);
        setCountry(true);
    }, []);

    return <CountryContext.Provider value={{
        country,
        setCountry,
        allCoutrysCaptals,
        setAllCoutrysCaptals,
        countrys,
        setCountrys,
        countryFilters,
        setCountryFilters
    }}>
        {children}
    </CountryContext.Provider>
};

export const useCountry = () => {
    const context = useContext(CountryContext);

    if (!context) throw new Error("useCountry não pode ser usado!");

    const {country, setCountry, allCoutrysCaptals, setAllCoutrysCaptals, countrys, setCountrys, countryFilters, setCountryFilters} = context;
    return {country, setCountry, allCoutrysCaptals, setAllCoutrysCaptals, countrys, setCountrys, countryFilters, setCountryFilters};
};