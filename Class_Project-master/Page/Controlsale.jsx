import React,{useState} from "react";
import '../css/Controlsale.css'
import ViewsaleItem from "./ViewsaleItem";

function Controlsale({setPopsale,item,setItem,setratesales,ratesales}){


  const selectList = [
    {value:"선택", name:"분류"},
    {value:"etc", name:"etc"},
    { value: "육류", name: "육류" },
    { value: "채소", name: "채소" },
    { value: "물품", name: "물품" },
];
  const style={
    fontSize: "12px"
  }
  const [search, setSearch] = useState("선택")

  function onChangeSearch(e){
    setSearch(e.target.value)
  }
  function getSearchResult(){
    return (search==="선택"
    ? item
    : item.filter((item)=>item.type.includes(search)) 
    )
  }

  function closeControlpage(){
    setPopsale(false)
  }
  return(
    <div className="ControlPage">
      <div className="closeSector">
        <button className="close" onClick={closeControlpage}>X</button>
      </div>
      <div className="selectsec">
      <select className="deleteselect" onChange={onChangeSearch} value={search}>
              {selectList.map((item) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
      </select>
      </div>
      <div className="controllist">
      <table>
        <thead style={style}>
          <tr>
            <th>분류</th>
            <th>품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 가격</th>
            <th>판매된 수량</th>
            <th>확인버튼</th>
          </tr>
        </thead>
        <tbody>
        {getSearchResult().map((item)=>(
            <ViewsaleItem ratesales={ratesales} setratesales={setratesales} item={item} setItem={setItem} key={item.number}{...item}></ViewsaleItem>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}


export default Controlsale;