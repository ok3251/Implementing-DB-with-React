import React, {useState} from "react";

function Gaesipan({CreatePost}){
    const [postItems, setPostItems] = useState();
    function ChangePost(e){
        setPostItems(e.target.value)
    }
    function PostSubmit(){
        CreatePost(postItems)
    }
    return(
        <div>
            <input type="text" onChange={ChangePost} />
            <button onClick={PostSubmit}>확인</button>
        </div>
    )
}
export default Gaesipan;