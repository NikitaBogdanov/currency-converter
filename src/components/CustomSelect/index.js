import React, {useState, useEffect, useRef} from 'react';
import Arrow from '../../images/arrow-down-sign-to-navigate.png';
import './style.css';

function CustomSelect({current, rates, currencyList, handleOnChange}) {
    const selector = useRef();
    const node = useRef();
    const [isOpenList, setIsOpenList] = useState(false);

    const handleClick = e => {
        if (node.current && node.current.contains(e.target)) return;
        setIsOpenList(false);
    };

    useEffect(() => {
        const addListener = () => {
            document.addEventListener('mousedown', handleClick);
        };
        addListener();
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const handleOnSelect = (e, key) => {
        setIsOpenList(false);
        handleOnChange(key, "currency");
        e.stopPropagation();
    };

    return (
        <div ref={selector}
             className="custom-select"
             onClick={() => {
                 setIsOpenList(true)
             }}
        >
            <div className="custom-select-input">
                <div
                    className="custom-select-arrow"
                    style={{backgroundImage: `url(${Arrow})`}}
                />
                {current.currency}
            </div>
            {isOpenList && <div
                className="custom-dropdown-list"
                ref={node}
                style={{height: `calc(100vh - ${window.pageYOffset + selector.current.getBoundingClientRect().top + 16}px)`}}
            >
                {Object.keys(rates).map(key => (
                    <div
                        className={current.currency === key ? "current" : ""}
                        key={key}
                        onClick={(e) => {
                            handleOnSelect(e, key)
                        }}
                    >
                        <span>{currencyList[key]}</span>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default CustomSelect;
