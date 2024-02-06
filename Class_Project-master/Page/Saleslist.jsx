import React,{useState} from "react";
import '../css/ViewList.css'
import SalesItems from "./Salesitems";
import Controlsale from "./Controlsale";

function Saleslist({item,onlogin,onChangeNum,setItem,ratesales,setratesales,ratesale}) {

  const [popsale,setPopsale] = useState(false)

  const ratestyle={
    fontWeight:"bold",
    fontSize:"20px",
    textAlign: "center",
    width:"600px"

  }

  const style={
    fontSize: "12px"
  }
  const barstyle={
    width:"100px"
  }
  const btnstyle={
    width:"100px",
    height:"30px",
    backgroundColor:"gray",
    fontWeight:"bold",
    color:"white",
    cursor:"pointer"
  }
  const selectList = [
    {value:"선택", name:"분류"},
    {value:"etc", name:"etc"},
    { value: "육류", name: "육류" },
    { value: "채소", name: "채소" },
    { value: "물품", name: "물품" },
];

  const [search, setSearch] = useState("선택");

  function onsalesControll(){
    if(onlogin===1){
      setPopsale(true)
  }else{
      alert('관리자 권한이 필요합니다.')
  }
  }

  function onChangeSearch(e){
    setSearch(e.target.value)
  }
  function getSearchResult(){
    return (search==="선택"
    ? item
    : item.filter((item)=>item.type.includes(search)) 
    )
  }
  return (
    <div className="Itemboard">
      <h2>매출확인</h2>
      <div className="salesbutton">
        <button style={btnstyle} onClick={onsalesControll}>매출관리</button>
        {popsale && <Controlsale setratesales={setratesales} ratesales={ratesales} setItem={setItem} onChangeNum={onChangeNum} item={item} setPopsale={setPopsale}></Controlsale>}
        </div>
      <div className="selectbar">
      <select className="searchselect" onChange={onChangeSearch} value={search} style={barstyle}>
              {selectList.map((item) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
      </select>
      </div>
      <table style={style}>
        <thead>
          <tr>
            <th>분류</th>
            <th>품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 가격</th>
            <th>판매된 수량</th>
            <th>매출액</th>
          </tr>
        </thead>
        <tbody>
          {getSearchResult().map((item)=>(
            <SalesItems  item={item} key={item.number}{...item}></SalesItems>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>총매출</td>
            <div style={ratestyle}>{ratesales}</div>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Saleslist;