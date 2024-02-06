import React, {useState,useRef,useEffect} from "react";
import Header from "./Header";
import MainLayOut from "./MainLayOut"
import "./css/App.css"

function App(){

    useEffect(()=>{
        const rateData = localStorage.getItem('rates');
        if (!rateData){
            return;
        }
        const rateDatas = JSON.parse(rateData);
        if (rateDatas.length===0){
            return;
        }
        
        setratesales(rateDatas)

    },[])

    
    useEffect(()=>{
        const rawData = localStorage.getItem('item');
        if (!rawData){
            return;
        }
        const localData = JSON.parse(rawData);
        if (localData.length===0){
            return;
        }
        setItem(localData)
        const totalRatesales = localData.reduce((total, item) => total + (item.rate * item.price), 0);
        setratesales(totalRatesales);

    },[])

    useEffect(()=>{

        const rawData1 = localStorage.getItem('onlogin');
        if (!rawData1){
            return;
        }
        const localData1 = JSON.parse(rawData1);
        if (localData1.length===0){
            return;
        }
        setOnlogin(localData1)
        if(localData1 === 1){
            setId('master')
        }
    },[])
    const [closePage,setClosePage] = useState(false)
    const [id,setId] = useState("")
    const [password, setPassword] = useState("");
    const [onlogin, setOnlogin] = useState(0);
    const [item, setItem] = useState([]);
    const itemNumber = useRef(0);
    const [ratesales, setratesales] = useState(0)
    function CreateItem(itemname,type,count,price,rate,ratesale){
        const newItem = {
            number: itemNumber.current,
            itemname,
            type,
            count,
            price,
            finalprice : count * price,
            rate: 0,
            ratesale:0,
        }
        const setnewItem = [newItem, ...item]
        setItem(setnewItem)
        localStorage.setItem('item',JSON.stringify(setnewItem));
        localStorage.setItem('rates',JSON.stringify(ratesales));
        itemNumber.current += 1
    }

    function onDelete(targetID) {
        const deletedItem = item.find((item) => item.number === targetID);
        
        if (!deletedItem) {
            return;
        }
        
        const DeleteID = item.filter((item) => item.number !== targetID);
        setItem(DeleteID);
    
        const updatedRatesales = ratesales - deletedItem.rate * deletedItem.price;
        setratesales(updatedRatesales);
    
        localStorage.setItem('item', JSON.stringify(DeleteID));
        localStorage.setItem('rates', JSON.stringify(updatedRatesales));
    }
    function openPage(){
        setClosePage(true)
    }
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked); // 클릭 여부를 토글
    };
    
    
    return(
        <>
            <div className="background">
                {closePage && <div className="App">
                <Header 
                id={id}
                password={password} 
                setId={setId} 
                setPassword={setPassword}
                onlogin={onlogin}
                setOnlogin={setOnlogin}
                setClosePage={setClosePage}
                > 
                </Header>
                <MainLayOut ratesales={ratesales} setratesales={setratesales} setItem={setItem} item={item} onlogin={onlogin} CreateItem={CreateItem} setOnlogin={setOnlogin} onDelete={onDelete}></MainLayOut>
                </div>}
                <div className="cmdcover" onClick={handleClick} style={{ background: isClicked ? 'rgba(211,211,211,0.5)' : ''}}>
                    <div className="cmdicon" onDoubleClick={openPage} style={{marginLeft: "20px"}}></div>
                </div>
            </div>
            <div className="underbar">
                <div className="startbar"></div>
                <div style={{fontSize: "25px", marginLeft: "10px"}}>::</div>
                <div className="explorer" onClick={()=>window.open("https://www.google.co.kr")}></div>
                <div className="righttask">최.박.정</div>
            </div>
        </>
    )
}
export default App;