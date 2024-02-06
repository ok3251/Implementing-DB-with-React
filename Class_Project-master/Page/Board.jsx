import React, { useState, useEffect } from "react";
import '../css/Board.css'; 

function Board({onlogin}) {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [
      { id: 1, title: "첫 번째 글", author: "사용자1", content: "첫 번째 글 내용", date: "2023-12-01" },
      { id: 2, title: "두 번째 글", author: "사용자2", content: "두 번째 글 내용", date: "2023-12-02" },
      { id: 3, title: "세 번째 글", author: "사용자3", content: "세 번째 글 내용", date: "2023-12-03" },
    ];
  });

  const [CreatePost, setCreatePost] = useState({
    title: "",
    author: "",
    content: "",
    date: "",
  });

  const [isWriting, setIsWriting] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatePost({
      ...CreatePost,
      [name]: value,
    });
  };

  const handleAddPost = () => {
    if (CreatePost.title && CreatePost.author && CreatePost.content) {
      if (selectedPost) {
        const updatedPosts = posts.map((post) =>
          post.id === selectedPost.id ? { ...post, ...CreatePost } : post
        );
        setPosts(updatedPosts);
        setSelectedPost(null);
      } else {
        const newId = posts.length + 1;
        const updatedPosts = [
          ...posts,
          { id: newId, ...CreatePost, date: new Date().toISOString().slice(0, 10) },
        ];
        setPosts(updatedPosts);
      }
      setCreatePost({
        title: "",
        author: "",
        content: "",
        date: "",
      });
      setIsWriting(false);
      alert("게시가 완료되었습니다.")
    } else {
      alert("제목, 작성자, 내용을 입력하세요!");
    }
  };

  const handleToggleWriting = () => {
    setIsWriting((prevIsWriting) => !prevIsWriting);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
    setIsWriting(null);
  };


  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    if(onlogin===1){
      if (window.confirm("정말 삭제하시겠습니까?")) {
        alert("삭제되었습니다.");
        setPosts(updatedPosts);
        setSelectedPost(null);
      }
    }
    else {
      alert("관리자 권한이 필요합니다.")
    }
  };

  const handleEditPost = () => {
    setCreatePost({
      title: selectedPost.title,
      author: selectedPost.author,
      content: selectedPost.content,
      date: selectedPost.date,
    });
    setIsWriting(true);
  };
  const [SearchTerm, setSearchTerm] = useState('');
  
  const contentSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(SearchTerm.toLowerCase())
  )
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  return (
    <div className="board">
      <h2>게시판</h2>
      {!isWriting && !selectedPost && (<input placeholder="제목으로 검색하세요." value={SearchTerm} type="text" onChange={contentSearch}/>)}
      {!isWriting && !selectedPost && (
        <button onClick={handleToggleWriting} className="WriteContents">글쓰기</button>
      )}
      {isWriting ? (
        <div>
          <h3>새 글 작성</h3>
          <label>
            제목
            <input
              type="text"
              name="title"
              value={CreatePost.title}
              onChange={handleInputChange}
              placeholder="제목"
              className="TitleCommunity"
            />
          </label>
          <label>
            작성자
            <input
              type="text"
              name="author"
              value={CreatePost.author}
              onChange={handleInputChange}
              placeholder="작성자"
              className="CreateUser"
            />
          </label>
          <label>
            <textarea
              name="content"
              value={CreatePost.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해주세요"
              className="Content"
            />
          </label>
          <button onClick={handleAddPost} className="PostContents">
            글 올리기
          </button>
          <button onClick={handleBack}>뒤로 가기</button>
        </div>
      ) : selectedPost ? (
        <div className="DetailPageAll">
          <p className="DetailElement">제목: {selectedPost.title}</p>
          <p className="DetailAuthor">작성자: {selectedPost.author}</p>
          <p className="DetailContents">{selectedPost.content}</p>
          <p className="Date">작성날짜: {new Date(selectedPost.date).toLocaleDateString()}</p>
          <button onClick={handleEditPost}>수정</button>
          <button onClick={() => handleDeletePost(selectedPost.id)}>삭제</button>
          <button onClick={handleBack}>뒤로 가기</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr className="trmain">
              <th>No.</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="titlebutton" onClick={() => handlePostClick(post)}>
                  {post.title}
                </td>
                <td>{post.author}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td className="deleteselectbtn" onClick={() => handleDeletePost(post.id)}>삭제</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}


    </div>
  );
}

export default Board;