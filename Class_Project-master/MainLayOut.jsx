import React, {useState,useEffect} from "react";
import Controller from "./Controller";
import "./css/MainLayOut.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainGraph from "./MainGraph";
import Board from "./Page/Board";
import ViewList from "./Page/ViewList";
import Saleslist from "./Page/Saleslist";
import ExCharts from "./Page/ExCharts";
import Help from "./Page/Help";
import Items from "./Items";


function MainLayOut({CreateItem,onlogin,item,setItem,onDelete,ratesales,setratesales}){
    const [value, onChange] = useState(new Date());
    const [ctrViewPage,setViewpage] = useState(true);
    const [ctrBoardpage,setBoardpage] = useState(false);
    const [ctrItempage,setItempage] = useState(false);
    const [ctrViewlist,setViewlist] = useState(false);
    const [ctrsaleslist,setsaleslist] = useState(false);
    const [ctrExchart,setExchart] = useState(false);
    const [ctrHelppage,setHelppage] = useState(false);
    const [selected, setSelected] = useState("etc");

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

    useEffect(() => {
        const quarter = getQuarter(value);
        const targetData = item.find(item => item.quarter === quarter);
        if (targetData) {
            setratesales(targetData.ratesales);
        }
    }, [value, item]);
    
        const todayQuarter = getQuarter(value);
        const quarters = ['1분기', '2분기', '3분기', '4분기'];
        const currentQuarterIndex = quarters.indexOf(todayQuarter);
        const orderedQuarters = quarters
            .slice(currentQuarterIndex)
            .concat(quarters.slice(0, currentQuarterIndex))
            .map((quarter) => {
            if (quarter === todayQuarter) {
                return { name: quarter, 매출: ratesales };
            } else {
                return { name: quarter, 매출: 0 };
            }
        });


    
    return(
        <div className="AllPage">
            <div className="LeftSelect">
                <h4>메뉴</h4>
                <Controller setItem={setItem} item={item} onlogin={onlogin} CreateItem={CreateItem} onDelete={onDelete}
                
                setViewpage={setViewpage}
                setBoardpage={setBoardpage}
                setItempage={setItempage}
                setViewlist={setViewlist}
                setsaleslist={setsaleslist}
                setExchart={setExchart}
                setHelppage={setHelppage}


                >
                </Controller>
            </div>
            <div className="MainPage">
                
                {ctrViewPage && (<div className="CommunityView">
                    <h2>프로토타입 개발 영상</h2>
                </div>)}
                
                {ctrBoardpage && (<div className="BoardPage">
                    <Board onlogin={onlogin}></Board>
                </div>)}
                <div className="ItemsPage">
                {ctrItempage && <Items setItem={setItem} item={item} CreateItem={CreateItem}
            setSelected={setSelected} selected={selected} onDelete={onDelete} setItempage={setItempage} setViewlist={setViewlist}></Items>}
                </div>
                
                {ctrViewlist && (<div className="ViewListPage">
                <ViewList item={item}></ViewList>
                </div>)}
                
                {ctrsaleslist && (<div className="SalesList">
                <Saleslist ratesales={ratesales} setratesales={setratesales} setItem={setItem} item={item} onlogin={onlogin}/>
                </div>)}
                
                {ctrExchart && (<div className="ExChartPage">
                    <ExCharts></ExCharts>
                </div>)}

                {ctrHelppage && (<div className="HelpPage">
                    <Help></Help>
                </div>)}
                <div className="Viewer">
                    <Calendar className="Calendar" onChange={onChange} value={value} />
                    <MainGraph className="MainGraph" data={orderedQuarters}></MainGraph>
                </div>
            </div>
        </div>
        
    )
}
export default MainLayOut;