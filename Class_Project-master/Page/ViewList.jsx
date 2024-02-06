import React,{useState} from "react";
import '../css/ViewList.css'
import ViewItem from "./ViewItem";

function ViewList({item}) {
  const selectList = [
    {value:"선택", name:"분류"},
    {value:"etc", name:"etc"},
    { value: "육류", name: "육류" },
    { value: "채소", name: "채소" },
    { value: "물품", name: "물품" },
];

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
  return (
    <div className="Itemboard">
      <h2>재고확인</h2>
      <div className="selectbar">
      <select className="searchselect" onChange={onChangeSearch} value={search}>
              {selectList.map((item) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
      </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>분류</th>
            <th>품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 가격</th>
          </tr>
        </thead>
        <tbody>
          {getSearchResult().map((item)=>(
            <ViewItem key={item.number}{...item}></ViewItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewList;