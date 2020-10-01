import React, {useState} from "react";
import {useCountry} from "../../context";
import {Container} from "react-bootstrap";
import {Chart} from "react-google-charts";

export const Graphic = () => {
    const {
        allCoutrysCaptals,
    } = useCountry();

    const [options] = useState({
        title: 'Área de cada país em Km²'
    });

    const [optionsBar] = useState({
        title: 'População de cada país'
    });

    const [data] = useState([
        ['País', 'Área em Km²'],
        ...allCoutrysCaptals.map(item => [item.name, +item.area])
    ]);

    const [dataBar] = useState([
        ['País', 'População'],
        ...allCoutrysCaptals.map(item => [item.name, +item.population])
    ])

    return <>
        <h1 className="mb-3 text-primary">Gráficos</h1>
        <Container className="adjustementGraph">
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                data={data}
                options={options}
            />
            <br/>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="ColumnChart"
                data={dataBar}
                options={optionsBar}
            />
        </Container>
    </>;
}