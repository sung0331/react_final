// 년, 월, 마지막날짜 리턴
function getYearMonthLastday(){
  const now = new Date();
  console.log("체킁: ",now.toISOString())
  now.setMonth(now.getMonth()+1);
  now.setDate(0);

  return [now.getFullYear(),now.getMonth()+1,now.getDate()];
}

// 랜덤 칼라
function getColor(){
  let hexaString = "";
  for(let i=1; i<=3; i++){
      hexaString += Math.floor(Math.random()*255).toString(16)
  }
  return `#${hexaString}`;
}

// 배열 데이터 섞기
function shuffle(arr){
  let curInx = arr.length;

  while (curInx != 0) {

    let ranInx = Math.floor(Math.random() * curInx);
    curInx--;

    [arr[curInx], arr[ranInx]] = [arr[ranInx], arr[curInx]];
  }
}

// 가짜 일정 맹그는 함수
function makeEvents() {
  const titls = ["Oracle","Java","JavaScript","React","JSP",
                "Mybatis","JPA","Spring","Node","Project"];
  shuffle(titls);
  const comments = ["흥","치","피","컥","헉","얌","어","케","혹","앙"];

  const myEvents = [];
  const ranCnt = Math.floor(Math.random() * 3) + 7;
  const [year,month,lastday] = getYearMonthLastday();
  console.log(year,month,lastday);

  for (let i = 1; i <= ranCnt; i++) {
      let startDay = Math.ceil(Math.random()*lastday)
      if(startDay < 10 ) startDay = "0" + startDay;

      let temp = new Date(`${year}-${month}-${startDay}`)
      temp.setDate(temp.getDate() + Math.ceil(Math.random()* 7))
      let endYear = temp.getFullYear();
      let endMonth = temp.getMonth()+1;
      if(endMonth < 10 ) endMonth = "0" + endMonth;

      let endDay = temp.getDate();
      if(endDay < 10 ) endDay = "0" + endDay;

      let mEvent = {
          "id": `cal${i}`,
          "title": titls[i],
          "start": `${year}-${month}-${startDay}`,
          "end": `${endYear}-${endMonth}-${endDay}`,
          "allDay": true,  // 일단 심플하겡
          "backgroundColor": getColor(),
          "textColor": getColor(),
          "extendedProps": {
              "comment": comments[i]
          }
      }
      myEvents.push(mEvent);
  }
  return myEvents;
}

export default makeEvents;