import React, { useState } from "react";

function ViewsaleItem({ itemnumber, itemname, type, count, price, finalprice, item, setItem, ratesales, setratesales }) {
  const [rates, setRates] = useState(0);

  function Changerate(e) {
    const ratesqlry = parseInt(e.target.value);

    if (ratesqlry > parseInt(item.count)) {
      alert('입력하신 수량이 남아있는 수량보다 많습니다')
    } else {
      setRates(ratesqlry);
    }
  }

  function ChangeSubmit() {
    const updatedItem = {
      ...item,
      count: parseInt(item.count) - parseInt(rates),
      rate: item.rate + parseInt(rates),
      ratesale: (item.rate + parseInt(rates)) * price,
      finalprice: item.price * (parseInt(item.count) - parseInt(rates)),
    };

    const updatedRates = parseInt(rates * price);
    setratesales((prevRs) => prevRs + updatedRates);

    setItem((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.price === price && prevItem.itemname === itemname ? updatedItem : prevItem
      )
    );

    const resetNewItems = JSON.parse(localStorage.getItem('item')).map((prevItem) =>
      prevItem.itemname === itemname && prevItem.price === price ? updatedItem : prevItem
    );

    localStorage.setItem('item', JSON.stringify(resetNewItems));
    localStorage.setItem('rates', JSON.stringify(ratesales + updatedRates));

    setRates(0)
  }

  const inputstyle = {
    width: '90px',
    height: '28px',
  };

  const btnstyle = {
    backgroundColor: 'lightgray',
    color: 'blue',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <tr>
      <td>{type}</td>
      <td>{itemname}</td>
      <td>{count}</td>
      <td>{price}원</td>
      <td>{finalprice}원</td>
      <input onChange={Changerate} style={inputstyle} type="number" min="0" value={rates} />
      <td onClick={ChangeSubmit} style={btnstyle}>
        판매완료
      </td>
    </tr>
  );
}

export default ViewsaleItem;