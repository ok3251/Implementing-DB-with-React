import React,{ useState} from "react";
import "./css/Header.css"
import Loginpage from "./Loginpage";

function Header({setId,setPassword,id,password,setOnlogin,onlogin,setClosePage}) {
  const [openlog,setOpenlog] = useState(false);

  function openpage(){
    setOpenlog(true)
    setId("")
    setPassword("")
  };

  function Logout(){
    setOnlogin(0)
    localStorage.setItem('onlogin',JSON.stringify(0));
    setId("")
    setPassword("")
    alert('로그아웃이 완료되었습니다.')
  }
  function PageClose(){
    setClosePage(false);
  }

  return (
    <div className="Header">
      <div className="view_user">
        {onlogin === 1 && <h3>{id}계정</h3>}
        {onlogin === 0 && <h3>비회원</h3>}
      </div>
      <div className="Title">
        <h2>재고 관리 체계</h2>
        <h4>{new Date().toLocaleDateString()}</h4>
      </div>
      <div className="titlebtn">
        {onlogin === 0 && <button onClick={openpage} className="button1 login">로그인</button>}
        {openlog && <Loginpage setOpenlog={setOpenlog} id={id} password={password} setId={setId} setPassword={setPassword} setOnlogin={setOnlogin}></Loginpage>}
        {onlogin === 1 && <button onClick={Logout} className="button1 logout">로그아웃</button>}
      </div>
      <div>
        <button className="closeApp" onClick={PageClose}>X</button>
      </div>
    </div>
  )
};
export default Header;