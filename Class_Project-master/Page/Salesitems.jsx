import React from "react";

function SalesItems({item}){

  return(
    <tr>
      <td>{item.type}</td>
      <td>{item.itemname}</td>
      <td>{item.count}</td>
      <td>{item.price}원</td>
      <td>{item.finalprice}원</td>
      <td>{item.rate}</td>
      <td>{item.ratesale}</td>
    </tr>
  )
}

export default SalesItems;