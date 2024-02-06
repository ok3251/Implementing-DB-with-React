import React from "react";

function ViewItem({itemname,type,count,price,finalprice}){

  return(
    <tr>
      <td>{type}</td>
      <td>{itemname}</td>
      <td>{count}</td>
      <td>{price}원</td>
      <td>{finalprice}원</td>
    </tr>
  )
}

export default ViewItem;