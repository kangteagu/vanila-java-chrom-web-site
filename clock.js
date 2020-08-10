const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`; // 사용되는 삼항 연산자 웹에서 표시되는 초단위 에서 10보다 작을경우 앞에 0을 붙여준다 ex) `${hours < 10 ? `0${hours}` : hours} 시간이 10보다 작을 경우 0과 시간을 반환하고 아닐 경우 시간만 반환한다

}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init(); 