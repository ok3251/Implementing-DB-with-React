import React from "react";
import "./css/Controller.css";



function Controller({onlogin,
    setViewpage,setBoardpage,setItempage,setViewlist,setsaleslist,setExchart,setHelppage}) {




    function HomePage(){
        setViewpage(true)
        setBoardpage(false)
        setItempage(false)
        setViewlist(false)
        setsaleslist(false)
        setExchart(false)
        setHelppage(false)
    }
    function BoardPage(){
        setViewpage(false)
        setBoardpage(true)
        setItempage(false)
        setViewlist(false)
        setsaleslist(false)
        setExchart(false)
        setHelppage(false)
    }

    function itemClick(){
        if(onlogin===1){
            setViewpage(false)
            setBoardpage(false)
            setItempage(true)
            setViewlist(true)
            setsaleslist(false)
            setExchart(false)
            setHelppage(false)
        }else{
            alert('관리자 권한이 필요합니다.')
        }
    }

    function ViewListpage(){
        setViewpage(false)
        setBoardpage(false)
        setItempage(false)
        setViewlist(true)
        setsaleslist(false)
        setExchart(false)
        setHelppage(false)
    }

    function SalesListPage(){
        setViewpage(false)
        setBoardpage(false)
        setItempage(false)
        setViewlist(false)
        setsaleslist(true)
        setExchart(false)
        setHelppage(false)
    }

    function ChartPage(){
        setViewpage(false)
        setBoardpage(false)
        setItempage(false)
        setViewlist(false)
        setsaleslist(false)
        setExchart(true)
        setHelppage(false)
    }

    function HelpPage(){
        setViewpage(false)
        setBoardpage(false)
        setItempage(false)
        setViewlist(false)
        setsaleslist(false)
        setExchart(false)
        setHelppage(true)
    }


    return(
        <div className="Controller">
            <button className="button" onClick={HomePage}>Home</button>
            <button className="button" onClick={BoardPage}>게시판</button>
            <button className="button" onClick={itemClick}>재고관리</button>
            <button className="button" onClick={ViewListpage}>재고확인</button>
            <button className="button" onClick={SalesListPage}>매출확인</button>
            <button className="button" onClick={ChartPage}>시뮬레이션</button>
            <button className="button" onClick={HelpPage}>Help</button>
        </div>
    )
}
export default Controller;