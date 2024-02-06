import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import '../css/ExCharts.css'
import Graph from "../Graph";

function SaleExCharts() {
  const [Sale_items, setSaleItems] = useState([]);
  const [Sale_price, setSalePrice] = useState(0);
  const [Sale_selectedDate, setSaleSelectedDate] = useState(null);
  const [Sale_dataForGraph, setSaleDataForGraph] = useState([]);
  // function stopPropagation(event) {
  //   event.stopPropagation();
  // }

  useEffect(() => {
    const graphData = Sale_items.reduce((acc, item) => {
      const Sale_quarter = item.itemDate;
      const existingQuarter = acc.find(data => data.name === Sale_quarter);
  
      if (existingQuarter) {
        existingQuarter.매출 += parseInt(item.itemPrice);
      } else {
        acc.push({
          name: Sale_quarter,
          "매출": parseInt(item.itemPrice)
        });
      }
  
      return acc;
    }, []);

    setSaleDataForGraph(graphData);
  }, [Sale_items]);


  function Sale_priceChange(e) {
    setSalePrice(e.target.value);
  }

  function Sale_handleDateChange(date) {
    setSaleSelectedDate(date); 
  }

  function Sale_canSubmit() {
    return Sale_price !== "" && Sale_selectedDate !== null;
  }

  function Sale_onSubmit() {
    if(Sale_selectedDate==null){
      alert('날짜를 입력해주세요')
    }else{
      const formattedDate = Sale_selectedDate ? formatDate(Sale_selectedDate) : null;
    const Sale_quarter = getQuarter(Sale_selectedDate);
    const Sale_newItem = {

      itemPrice: parseInt(Sale_price),
      itemDate: Sale_quarter,
      itemformattedDate : formattedDate
    };
  
    setSaleItems([...Sale_items, Sale_newItem]);

    setSalePrice(0);
    setSaleSelectedDate(null); 

    const SalegraphData = Sale_items.reduce((Sale, item) => {
      const quarter = item.itemDate;
      const existingQuarter = Sale.find(data => data.name === quarter);

      if (existingQuarter) {
        existingQuarter.amt += parseInt(item.itemPrice);
      } else {
        Sale.push({
          name: quarter,
          "매출": parseInt(item.itemPrice)
        });
      }

      return Sale;
    }, []);

    setSaleDataForGraph(SalegraphData);
  }
    }
    

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  }

  function getQuarter(date) {
    const month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) {
      return '1분기';
    } else if (month >= 4 && month <= 6) {
      return '2분기';
    } else if (month >= 7 && month <= 9) {
      return '3분기';
    } else {
      return '4분기';
    }
  }

  return (
    <div>
      <h3>판매된 정보를 입력해주세요</h3>
      <div className="input_field">
        
        <input value={Sale_price} onChange={Sale_priceChange} type="number" placeholder="매출액" />
        <DatePicker
          selected={Sale_selectedDate}
          onChange={Sale_handleDateChange}
          locale={ko}
          dateFormat="yyyy-MM-dd" //0000년 00월 00일로 표시
        />
        <div>
        <div className="chartbutton" onClick={Sale_onSubmit} disabled={!Sale_canSubmit()}>추가</div>
        </div>
        
      </div>
      <h2>매출 확인</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>매출액</th>
              <th>분기</th> 
            </tr>
          </thead>
          <tbody>
            {Sale_items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemformattedDate}</td>
                <td>{item.itemPrice}</td>
                <td>{item.itemDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="LineGraph">
        <Graph data={Sale_dataForGraph} />
      </div>
    </div>
  );
}


export default SaleExCharts;
