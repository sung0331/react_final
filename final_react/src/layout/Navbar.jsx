import React, { useState } from "react";
import "./Header.css";

const Navbar = () => {
  const [visibleSidebar, setVisibleSidebar] = useState(null); // 현재 열려 있는 사이드바 ID
  const [visibleSubmenu, setVisibleSubmenu] = useState(null); // 현재 열려 있는 서브메뉴 ID

  // 사이드바 토글 함수
  const toggleSidebar = (sidebarId) => {
    setVisibleSidebar((prev) => (prev === sidebarId ? null : sidebarId));
  };

  // 서브메뉴 토글 함수
  const toggleSubmenu = (submenuId) => {
    setVisibleSubmenu((prev) => (prev === submenuId ? null : submenuId));
  };

  return (
    <div className="wgsidebar">
      <ul>
        <li className="menu-item" onClick={() => toggleSidebar("schedule-sidebar")}>
          <i className="bi bi-calendar-check"></i> 일정
        </li>

        <li className="menu-item" onClick={() => toggleSidebar("attendance-sidebar")}>
          <i className="bi bi-clock"></i> 근태
        </li>

        <li className="menu-item" onClick={() => toggleSidebar("price-sidebar")}>
          <i className="bi bi-clipboard-check"></i> 결재
        </li>

        <li className="menu-item" onClick={() => toggleSidebar("promenu-sidebar")}>
          <i className="bi bi-person-circle"></i> 업무
        </li>
        <li className="menu-item" onClick={() => toggleSidebar("contract-sidebar")}>
          <i className="bi bi-file-earmark-check"></i> 계약
        </li>

        <li className="menu-item" onClick={() => toggleSidebar("cash-sidebar")}>
          <i className="bi bi-wallet-fill"></i> 매출
        </li>

        <li className="menu-item" onClick={() => toggleSidebar("business-sidebar")}>
          <i className="bi bi-cash"></i> 영업
        </li>


        <li className="menu-item" onClick={() => toggleSidebar("edu-sidebar")}>
          <i className="bi bi-chat-left-dots"></i> 소통
        </li>
        
        <li className="menu-item" onClick={() => toggleSidebar("mail-sidebar")}>
          <i className="bi bi-envelope"></i> 메일
        </li>
      </ul>

      {/* 일정 사이드바 */}
      <div className={`schedule-sidebar ${visibleSidebar === "schedule-sidebar" ? "visible" : ""}`}>
        <div className="schedule-buttons">
          <button className="blue-btn">일정추가</button>
          <button className="white-btn">회의실 예약</button>
        </div>
        <div className="horizontal-line"></div>
        <button
          className="white-btn"
          onClick={() => toggleSubmenu("my-schedule")}
        >
          내 일정 관리 {visibleSubmenu === "my-schedule" ? "▲" : "▼"}
        </button>
        {visibleSubmenu === "my-schedule" && (
          <div className="submenu" style={{ paddingLeft: "20px" }}>
            <a href="#">팀 일정</a>
            <br />
            <a href="#">부서 회의록</a>
            <br />
            <a href="#">부서 휴가 현황</a>
          </div>
        )}
        <button className="white-btn">부서 일정함</button>
        <button className="white-btn">내 일정함</button>
        <button className="white-btn">캘린더</button>
      </div>

      {/* 근태 */}
      <div className="attendance-sidebar" id="attendance-sidebar">
        <div className="attendance-buttons">
          <button className="blue-btn" id="compose-btn">내 근태 현황</button>
        </div>
        <button className="white-btn">내 출퇴근 내역</button>
        <div className="horizontal-line"></div>
        
        <button className="white-btn" id="my-att">근태 문서▼</button>
        <div className="submenu" id="my-attlist"
          style={{ display: "none", paddingLeft: "20px"}}>
          <a href="#">내 근태 현황</a><br/>
          <a href="#">내 근태 현황</a><br/>
        </div>
        
        <button className="white-btn" id="my-att2">근태 관리▼</button>
        <div className="submenu" id="my-attlist2"
          style={{display: "none", paddingLeft: "20px"}}>
          <a href="#">출퇴근 내역</a><br/>
          <a href="#">근태 신청 현황</a><br/>
          <a href="#">근무 리포트</a><br/>
          <a href="#">휴가 내역</a><br/>
        </div>
        <div className="horizontal-line"></div>
        <button className="white-btn">출퇴근 내역</button>
        <button className="white-btn">근태 신청 현황</button>
        <button className="white-btn">근무 리포트</button>
        <button className="white-btn">휴가 내역</button>
      </div>

      {/* 결재 */}
      <div className="price-sidebar" id="price-sidebar">
        <div className="price-buttons">
          <button className="blue-btn" id="compose-btn">기안작성</button>
          <button className="white-btn">받은메일</button>
        </div>
        <div className="horizontal-line"></div>
        <button className="white-btn">결재 대기</button>
        <button className="white-btn">결재 요청</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">기안함</button>
        <button className="white-btn">종결</button>
        <button className="white-btn">회수</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">임시저장</button>
        <button className="white-btn">결재함</button>
        <button className="white-btn">미결</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">열람/공람</button>
        <button className="white-btn">부서문서함</button>
        <button className="white-btn">문서관리</button>
        <button className="white-btn">미결</button>
        <button className="white-btn">승인</button>
        <div className="horizontal-line"></div>
      </div>

      {/* 계약 */}
      <div className="contract-sidebar" id="contract-sidebar">
        <div className="contract-buttons">
          <button className="blue-btn" id="compose-btn">계약서 작성</button>
        </div>
        <div className="horizontal-line"></div>
        <button className="white-btn">계약서 관리</button>
        <button className="white-btn">계산서 관리</button>
        <button className="white-btn">입금 / 지출 관리</button>
        <button className="white-btn">계약 이행 모니터링</button>
        <button className="white-btn">리포트 및 분석</button>
      </div>

      {/* 매출 */}
      <div className="cash-sidebar" id="cash-sidebar">
        <div className="cash-buttons">
          <button className="blue-btn" id="compose-btn">매출관리</button>
        </div>
      </div>

      {/* 영업 */}
      <div className="business-sidebar" id="business-sidebar">
        <div className="business-buttons">
          <button className="blue-btn" id="compose-btn">영업관리</button>
        </div>
      </div>

      {/* 메일 사이드바 */}
      <div className={`mail-sidebar ${visibleSidebar === "mail-sidebar" ? "visible" : ""}`}>
        <div className="mail-buttons">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/mail/Mail.html")}
          >
            메일쓰기
          </button>
          <button className="btn btn-primary">내게쓰기</button>
        </div>
        <button className="white-btn">안 읽음</button>
        <button className="white-btn">중요</button>
        <button className="white-btn">첨부</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">전체 메일</button>
        <button className="white-btn">받은 메일함</button>
        <button className="white-btn">내게 쓴 메일함</button>
        <button className="white-btn">보낸 메일함</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">스팸 메일함</button>
        <button className="white-btn">휴지통</button>
      </div>

      {/* 소통 */}
      <div className="edu-sidebar" id="edu-sidebar">
        <div className="edu-buttons">
          <button className="blue-btn" id="compose-btn">게시판</button>
        </div>
        <button className="white-btn">Project</button>
        <button className="white-btn">Q&A</button>
        <div className="horizontal-line"></div>
        <button className="white-btn">커뮤니티</button>
        <button className="white-btn">만남의 광장</button>
        <button className="white-btn">일반</button>
      </div>

      {/* 고객 */}
      <div className="prod-sidebar" id="prod-sidebar">
        <div className="prod-buttons">
          <button className="blue-btn" id="compose-btn">고객관리</button>
        </div>
        <div className="horizontal-line"></div>

        <button className="white-btn">내 고객정보</button>
        <button className="white-btn">SMS발송</button>
        <button className="white-btn">고객 문의함</button>
      </div>

      {/* 프로필 */}
      <div className="pro-sidebar" id="pro-sidebar">
        <div className="pro-buttons">
          <button className="blue-btn" id="compose-btn">프로필관리</button>
        </div>
      </div>

      
    </div>
  );
};

export default Navbar;
