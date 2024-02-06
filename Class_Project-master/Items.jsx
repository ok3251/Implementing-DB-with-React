import React,{useState} from "react";
import "./css/Items.css"
import DeleteList from "./Page/DeleteList";


function Items({ setSelected, selected, CreateItem, item,setItem,onDelete,
    setViewlist,setItempage }) {
    const selectList = [
        { value: "etc", name: "etc" },
        { value: "육류", name: "육류" },
        { value: "채소", name: "채소" },
        { value: "물품", name: "물품" },
    ];

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [itemname, setName] = useState("");
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    function nameChange(e) {
        setName(e.target.value);
    }

    function countChange(e) {
        setCount(parseInt(e.target.value));
    }

    function priceChange(e) {
        setPrice(parseInt(e.target.value));
    }

    function onSubmit() {

        if(itemname ===""){
            alert('품명을 입력해주세요')
        }else{
            const existingItem = item.find((items) =>items.itemname === itemname && items.price === price );

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                count: parseInt(existingItem.count) + parseInt(count),
                finalprice: (parseInt(existingItem.count) + parseInt(count)) * existingItem.price,
            };

            setItem((prevItems) => prevItems.map((items) => (items.itemname === itemname && items.price === price  ? updatedItem : items)));
        } else {
          CreateItem(itemname, selected, count, price, count * price);
        }

        setName("");
        setCount(0);
        setPrice(0);

        }
        
    }

    function closeItem() {
        setViewlist(true);
        setItempage(false);
    }

    return(
        <div className="Itempage">
            <div className="closeSector"><button className="close" onClick={closeItem}>X</button></div>
            <h2>재고추가</h2>
            <div className="inputSector">
                <table className="itempagetable">
                    <tr>
                        <th>분류</th>
                        <th>품명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>추가버튼</th>
                    </tr>
                </table>

            <select className="select" onChange={handleSelect} value={selected}>
                {selectList.map((item) => {
                    return <option value={item.value} key={item.value}>
                    {item.name}
                    </option>;
                })}
            </select>
            <input value={itemname} placeholder="품명" onChange={nameChange} type="text" maxLength={10} />
            <input value={count} placeholder="수량" onChange={countChange} type="number" />
            <input value={price} placeholder="가격" onChange={priceChange} type="number" />
            <button className="insertbutton" onClick={onSubmit}>추가</button>
            </div>
            <div>
                <DeleteList item={item} onDelete={onDelete}></DeleteList>
            </div>
            <br></br>
        </div>
    
)
}

export default Items;