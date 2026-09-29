// app.js

// ----- 공통 요소 선택 -----
const getTodoBtn = document.getElementById("getTodoBtn");
const postBtn = document.getElementById("postBtn");
const patchBtn = document.getElementById("patchBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본 주소 - "http://localhost:8080/api"
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre 태그에 보여주는 헬퍼 함수
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// 1. GET 조회
async function fetchTodo() {
  resultDisplay.textContent = "Loading (GET) ......";
  //rejected error 방지 코드
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //    fetch 함수에서 기본값을 GET 요청이다.
    const response = await fetch(`${BASE_URL}/todos/1`);

    console.log(response.status); // 응답 상태코드

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 1-1. GET 조회 - then 사용
async function fetchTodo2() {
  resultDisplay.textContent = "Loading (GET) ......";
  //fetch는 Promise를 돌려준다.
  //메서드를 안쓰면 기본 GET 요청이다.
  fetch(`${BASE_URL}/todos/1`, { method: "GET" })
    .then((response) => {
      // 1번) 응답이 도착하면 실행된다.
      console.log(response.status); //응답 상태 코드
      // response.json()도 Promise를 반환한다.
      return response.json();
    })
    .then((data) => {
      //응답 본문에 문자열을 js object로 파싱되어 넘겨 받는다.
      console.log(data);
      showResult(data); // 내부에서 다시 객체를 문자열로 변환해서 화면에 그림
    })
    .catch((error) => {
      //인터넷 끊기는 동안 요청 자체 실패 등
      resultDisplay.textContent = "요청 실패: " + error.message;
    });
}

getTodoBtn.addEventListener("click", fetchTodo2);

// -------- 2. POST: 생성 ----------
// 통신을 할때는 async - await 구문을 많이 쓴다.
async function createTodo() {
  resultDisplay.textContent = "Loading (POST) ......";

  const newTodo = { title: "자바스크립트 복습", completed: false, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newTodo), // 객체를 문자열로 바꿔 보내야 한다.
    });

    //상태 코드 확인 POST: 201(created)
    console.log(response.status);
    const data = await response.json(); //json 형식에 문자열이 객체로 변환됨.
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패: " + error.message;
  }
}

//이벤트리스너 등록 - post(created)
postBtn.addEventListener("click", createTodo);

// 3. patch: 부분 수정
async function patchTodo() {
  resultDisplay.textContent = "Loading (PATCH) ......";
  // const updateTodo = { title: "자바스크립트 응용", body: "bar", userId: 1 };
  const updateTodo = { title: "자바스크립트 응용" }; // 변경할 필드만 보낸다.

  //rejected error 방지 코드
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //  PATCH 요청
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(updateTodo), //객체를 문자열로 변경해주기.
    });

    console.log(response.status); // 응답 상태코드

    if (!response.ok) {
      throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
    }

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 3.1.이벤트 리스너 등록
//  버튼 요소를 자바스크립트로 가져오기
patchBtn.addEventListener("click", patchTodo);

// 4. put: 전체 수정
async function putTodo() {
  resultDisplay.textContent = "Loading (PUT) ......";
  const updateAllTodo = { title: "자바스크립트 심화", body: "bar", userId: 1 };

  //rejected error 방지 코드
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //  PATCH 요청
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(updateAllTodo), //객체를 문자열로 변경해주기.
    });

    console.log(response.status); // 응답 상태코드

    if (!response.ok) {
      throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
    }

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 4.1.이벤트 리스너 등록
//  버튼 요소를 자바스크립트로 가져오기
putBtn.addEventListener("click", putTodo);

// 5. delete: 전체 삭제
async function deleteTodo() {
  resultDisplay.textContent = "Loading (DELETE) ......";
  const delTodo = {};

  //rejected error 방지 코드
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //  PATCH 요청
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(delTodo), //객체를 문자열로 변경해주기.
    });

    console.log(response.status); // 응답 상태코드

    if (!response.ok) {
      throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
    }

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 5.1.이벤트 리스너 등록
//  버튼 요소를 자바스크립트로 가져오기
deleteBtn.addEventListener("click", deleteTodo);

// 6. 받은 목록을 화면에 그리기(todo) 응용 코드

async function drawTodoList() {
  resultDisplay.textContent = "Loading (GET List) ......";

  // 새로운 목록을 그리기 전에 기존 목록을 비워준다.
  // 그렇지 않을 경우 클릭할 때마다 누적됨
  todoList.innerHTML = "";

  try {
    // 1) 전체 할 일 목록 가져오기
    // 데이터가 200개나 되기 때문에 연습을 위해 ?_limit=10을 붙여 10개만 가져오기
    const response = await fetch(`${BASE_URL}/todos?_limit=10`);

    if (!response.ok) {
      throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
    }

    // 2) JSON 문자열을 자바스크립트 배열 객체로 파싱
    const data = await response.json();

    //통신 결과창에도 한 번 띄워주기
    showResult(data);

    // 3) 배열 데이터를 순회하며 화면에 그리기
    data.forEach((todo) => {
      //<li>태그 생성
      const li = document.createElement("li");

      //완료 여부(completed)에 따라 스타일 다르게 적용(응용 포인트!)
      if (todo.completed) {
        li.style.textDecoration = "line-through"; // 취소선
        li.style.color = "gray"; //회색 글씨
      }

      // li 태그 안에 들어갈 텍스트 설정
      li.textContent = `[ID: ${todo.id}] ${todo.title}`;

      // ul 태그인 todoList의 자식으로 새로 만든 <li> 추가
      todoList.append(li);
    });
  } catch (error) {
    resultDisplay.textContent = "목록 요청 실패: " + error.message;
  }
}

// 6.1.이벤트 리스너 등록
// 버튼 요소를 자바스크립트로 가져오기
listBtn.addEventListener("click", drawTodoList);
