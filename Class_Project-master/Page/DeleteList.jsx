import React,{useState} from "react";
import '../css/DeleteList.css'
import DeleteItem from "./DeleteItem";

function DeleteList({item,onDelete}) {
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
      <h2>재고관리</h2>
      <div className="deletetbar">
      <select className="deleteselect" onChange={onChangeSearch} value={search}>
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
            <th>삭제버튼</th>
          </tr>
        </thead>
        <tbody>
          {getSearchResult().map((item)=>(
            <DeleteItem key={item.number}{...item} onDelete={onDelete}></DeleteItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteList;