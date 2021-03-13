import React, {useState, useEffect} from 'react';
import CustomSelect from './components/CustomSelect'
import './App.css';

function App() {
    const [current, setCurrent] = useState({
        currency: "USD",
        value: "1"
    });

    const [rates, setRates] = useState({});
    const [currencyList, setCurrencyList] = useState({});

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then(response => response.json())
            .then(data => setRates({...data.rates, "RUB": 1}));

        fetch('https://openexchangerates.org/api/currencies.json')
            .then(response => response.json())
            .then(data => setCurrencyList(data));
    }, []);

    const handleOnChange = (value, type) => {
        setCurrent({...current, [type]: value});
    };

    const getValue = (key) => {
        const result = (current.value / rates[current.currency] * rates[key]);
        return result.toFixed(2).replace(".", ",");
    };

    return (
        <div className="container">
            <div className="header">
                Currency converter
            </div>
            <div className="content">
                <div className="input-panel">
                    <CustomSelect
                        current={current}
                        rates={rates}
                        currencyList={currencyList}
                        handleOnChange={handleOnChange}
                    />
                    <input
                        className="currency-input"
                        type="number" value={current.value}
                        onChange={(e) => handleOnChange(e.target.value, "value")}
                    />
                </div>

                <div className="currency-list">
                    {Object.keys(rates).map(key => (
                        <div
                            className="currency-row"
                            key={key}
                        >
                            <div className="currency-key">{key}</div>
                            <div className="currency-value">{getValue(key)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
