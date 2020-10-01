import React, {useEffect} from "react";
import {Table, Container, Button} from "react-bootstrap";
import {useCountry} from "../../context";

export const CountrysCaptals = () => {
    const {
        allCoutrysCaptals,
        countrys,
        setCountrys,
        countryFilters,
        setCountryFilters
    } = useCountry();

    useEffect(() => {
        setCountrys(allCoutrysCaptals.sort((a, b) => {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        }));
    }, [allCoutrysCaptals, setCountrys]);

    useEffect(() => {
        setCountryFilters(countrys)
    }, [countrys, setCountryFilters]);

    const SearchCountry = (e) => {
        const valueKey = e.target.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "");

        const countrysAmericaFilters = countrys.filter(item => item.name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valueKey) > -1);

        setCountryFilters(countrysAmericaFilters);
    }

    const SearchLanguage = (e) => {
        const valueKey = e.target.innerText.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "");

        const countrysAmericaFilters = countrys.filter(item => item.languages[0].name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valueKey) > -1);

        setCountryFilters(countrysAmericaFilters);
    }

    const removeFilter = () => {
        setCountryFilters(countrys);
    }

    return <>
        <div>
            <Container>
                <h1 className="mb-3 text-primary">
                    Conheça os Países da América e suas Capitais
                </h1>

                <input className="Input mb-3 p-4" type="text"
                       placeholder="Buscar País..." onInput={SearchCountry}/>
            </Container>

            <div className="adjustementTable container">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>PAÍS</th>
                        <th className="alignBtn">
                            IDIOMA OFICIAL
                            <Button className="btn btn-danger ml-3 p-1"
                                    onClick={removeFilter}>
                                <i className="fa fa-filter" aria-hidden="true"/>
                                <i className="fa fa-times" aria-hidden="true"/>
                            </Button>
                        </th>
                        <th>CAPITAL</th>
                        <th>GOOGLE MAPS</th>
                    </tr>
                    </thead>
                    <tbody id="tabelaBody">
                    {countryFilters.map((item, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button className="mr-3 btn-block"
                                        onClick={SearchLanguage}>
                                    {item.languages[0].name}
                                </Button>
                            </td>
                            <td>{item.capital}</td>
                            <td>
                                <a href={'https://www.google.com.br/maps/place/' + item.name}
                                   target="_blank"
                                   rel="noopener noreferrer"><Button
                                    variant="primary btn-block">
                                    Ver País no Mapa
                                </Button></a>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    </>;
}