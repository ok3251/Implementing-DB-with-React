import React from "react";
import '../css/DeleteItem.css'

function DeleteItem({number,itemname,type,count,price,finalprice,onDelete}){
  function onClickDelete(){
    onDelete(number)
  }

  return(
    <tr>
      <td>{type}</td>
      <td>{itemname}</td>
      <td>{count}</td>
      <td>{price}원</td>
      <td>{finalprice}원</td>
      <td className="deletebutton" onClick={onClickDelete}>삭제</td>
    </tr>
  )
}

export default DeleteItem;