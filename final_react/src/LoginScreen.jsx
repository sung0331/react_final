import React, { useEffect, useState } from 'react'
import "./LoginStyle.css";
import { getEmpNoById, login }from "./api.js"

const LoginScreen = () => {

  const [empId, setEmpId] = useState("");
  const [empPw, setEmpPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  useEffect (() =>{
    const rememberEmpId = localStorage.getItem("rememberempId");
    if(rememberEmpId){
      setEmpId(rememberEmpId);
      setRemember(true);
    }
  },[]);

  const handleLoginSubmit = async (e) =>{
    e.preventDefault();

    if(remember){
      localStorage.setItem("remeberEmpId",empId);
    }else{
      localStorage.removeItem("rememberEmpId");
    }

    try{
      // login API호출
      const{accessToken, refreshToken} = await login(empId, empPw)

      // 토큰 저장
      localStorage.setItem("accessToken",accessToken);
      localStorage.setItem("refreshToken",refreshToken);

      // 로그인 성공 후 id로 empNo 가져오기
      const empVO = await getEmpNoById(empId);
      localStorage.setItem("empNo",empVO.empNo);
      localStorage.setItem("empName",empVO.empName);
      localStorage.setItem("deptNo",empVO.deptNo);
      localStorage.setItem("postNo",empVO.postNo);//es) 대리 : 6
      localStorage.setItem("empVO",empVO);
      


      // 로그인 성공 후 이동
      window.location.href="http://localhost:7921/schedule";
    }catch(error){
      setErrorMessage("잘못된 아이디 또는 비밀번호 입니다.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="logo">NOSLEEP</h1>

      {errorMessage && (
        <div className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} id="login-form">
          <p>회원 아이디:20241231002</p>
          <p>관리자 아이디: 20241231005 </p>
        <div className="input-group">
          <label htmlFor="empId">아이디</label>
          <input
            type="text"
            id="empId"
            placeholder="아이디"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="empPw">비밀번호</label>
          <input
            type="password"
            id="empPw"
            placeholder="비밀번호"
            value={empPw}
            onChange={(e) => setEmpPw(e.target.value)}
            required
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="remember-id"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember-id">아이디 저장</label>
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  )
}

export default LoginScreen