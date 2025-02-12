import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { useEffect, useRef, useState } from "react";
import initLevels from "./zoomLevelSetting";
import './index.css';
import axios from 'axios';

function MyGantt({ curzoom, onDataUpdated, msgs }) {
  const ganttRef = useRef(null);
 
  const [data, setData] = useState([]);  // 상태에 받아온 데이터 저장

  // 데이터 프로세서 초기화
  let dataProcessor = null;
  const initGanttDataProcessor = () => {
    dataProcessor = gantt.createDataProcessor((entityType, action, item, taskId,taskName) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(entityType, action, item, taskId,taskName);
        }
        return resolve();
      });
    });
  };

  // 컴포넌트 마운트 후 첫 번째 데이터 받아오기
  useEffect(() => {
    // 간트 차트 초기화
    gantt.i18n.setLocale("kr");
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.scales = [
      { unit: "day", step: 1, format: "%j,%D" }
    ];
    gantt.locale.labels.new_task = "새 작업";
    gantt.config.task_date = "&nbsp;&nbsp;&nbsp;&nbsp;%Y년 %m월 %d일";

    gantt.config.autoscroll = true;

    // x축 스크롤바 처리 
    gantt.config.layout = {
      cols: [
      {
        // adding horizontal scrollbar to the grid via the scrollX attribute
        rows:[
          {view: "grid", scrollable: true, scrollY: "scrollVer"}, 
          {view: "scrollbar", id: "gridScroll"}  
        ]
      },
      {resizer: true, width: 1},
      {
        rows:[
          {view: "timeline", scrollX: "scrollHor", scrollable: true, scrollY: "scrollVer"},
          {view: "scrollbar", id: "scrollHor"}
        ]
      },
      {view: "scrollbar"}
      ]
    };
/*     gantt.config.columns = [
      { name: "text", label: "작업 이름", width: 200, tree: true },
      { name: "start_date", label: "시작 날짜", width: 100 },
      { name: "end_date", label: "종료 날짜", width: 100 },
      { name: "duration", label: "지속 시간", width: 80 },
      { name: "progress", label: "진행률", width: 80 },
      { name: "emp_no", label: "상태", width: 100 }  // 새로 추가된 컬럼
  ]; */
    // 줌 설정
    gantt.ext.zoom.init(initLevels);

    gantt.init(ganttRef.current);  // 간트 차트 초기화

    // CRUD 시작
    gantt.createDataProcessor({ 
      task: {
        // 작업 추가 (POST 요청)
        create: function(data) {
          // data에는 새로 생성된 작업의 모든 정보가 포함되어 있을 것입니다.
          console.log("새 작업 데이터", data); // 데이터 확인
          const newData = {
            taskId: data.id, // 새 작업의 taskId
            taskName: data.text, // 새 작업의 이름 (text)
            startDate: data.start_date, // 시작일
            endDate: data.end_date, // 종료일
          };
  
          // 서버 URL 설정
          const serverURL = "http://localhost:8020/gantt/create";
          
          axios.post(serverURL, newData)
            .then(resp => {
              if (resp.data) {
                console.log("서버 응답:", resp.data);
                alert("작업 추가가 완료되었습니다.");
              }
            })
            .catch((error) => {
              console.error("에러 발생:", error);
            });
        },
        // 간트차트 작업 수정 
        update: function(data, id) {
          // 수정할 데이터만 추출
          const updatedData = {
            taskId: id,                 // taskId (또는 id)
            taskName: data.text,        // 수정된 작업명 (text)
            startDate: data.start_date, // 수정된 시작일
            endDate: data.end_date,     // 수정된 종료일
            progress: data.progress,     // 수정된 진행률
            duration: data.duration,     // 수정된 지속시간
            taskEpns: data.taskEpns || "", // 옵션으로 추가된 task 설명
            taskRanking: data.taskRanking || 0, // 작업 순위
            empNo: data.empNo         // 작업자 번호
          };
          console.log("data" , data)
          // 서버로 수정된 데이터 전송
          axios.post("http://localhost:8020/gantt/update", updatedData)
            .then(resp => {
              alert("수정이 완료되었습니다.");
              console.log("서버 응답:", resp.data);
            })
            .catch((error) => {
              console.error("수정 중 에러 발생:", error);
            });
        },
         // 간트차트 작업 삭제 !
         delete: function(id) {
          console.log("id : ", id);
          axios.delete(`http://localhost:8020/gantt/delete/${id}`).then(resp => {
             let rslt = resp.data;
            console.log("삭제 성공", rslt);
            alert("삭제가 완료되었어요.");
            gantt.deleteTask(id);
          }).catch((error) => {
            console.error('에러남', error);
          });
         }
      }
      // 간트 차트 선 
      // link: {
      //    update: function(data, id) {},
      //    delete: function(id) {}
      // }
   });
    // CRUD 끝
    
    // axios로 데이터 받아오기
    axios.get('http://localhost:8020/gantt/list')
      .then(response => {
        const parsedData = response.data.map(item => {
          return {
            id: item.taskId,
            text: item.taskName || "새 작업",  // taskName이 없으면 "새 작업"으로 대체
            start_date: item.startDate.slice(0, 10), // YYYY-MM-DD 형식으로 변환
            end_date: item.endDate.slice(0, 10), // YYYY-MM-DD 형식으로 변환
            progress: item.progress || 0, // 프로그레스 값
            duration: item.duration || 0, // 지속 시간
            taskRanking: item.taskRanking || 0, // 작업 순위
            taskEpns: item.taskEpns || "", // 작업 설명 (옵션)
            empNo: item.empNo // 작업자 번호
          };
        });

        setData(parsedData);  // 받아온 데이터를 상태로 저장

        // 받은 데이터로 간트 차트 렌더링
        gantt.parse({
          data: parsedData
        });
        console.log("fdfdfdddfd" ,parsedData)
      })
      .catch(error => {
        console.error('데이터 로드 실패:', error);
      });
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  useEffect(() => {
    gantt.ext.zoom.setLevel(curzoom);  // 줌 레벨 설정
    initGanttDataProcessor();  // 데이터 프로세서 초기화

    return () => {
      if (dataProcessor) {
        dataProcessor.destructor();  // 데이터 프로세서 정리
        dataProcessor = null;
      }
    };
  }, [curzoom, msgs]);

  return (
    <div className="gantcon" ref={ganttRef} style={{ width: "100%", height: "60vh", border: "none" }}>
      {/* 간트 차트가 그려질 영역 */}
    </div>
  );
}

export default MyGantt;
