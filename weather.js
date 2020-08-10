const weather = document.querySelector(".js-weather"); 

const API_KEY = "645d33bbbdcec3850ee43adb42f8b58f"; // 날씨 관련 API 읽어오는 키
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @${place}`
    }); // 날씨 정보를 읽어노는 사이트 API  
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSucces(position){ // 좌표를 읽어오는데 성공하면 실행 하는 함수 
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude;  // 경도
    const coordsObj = {
        latitude,
        longitude 
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError(){ // 좌표를 읽어오는데 실패하면 나오는 함수 
    console.log("Cant access geo location");
} 

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError) //  나의 좌표를 읽어오는 함수  
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){ // localStorage 의 값이 null일 경우 실행 
        askForCoords();
    }else{ // localStorage 의 값이 null이 아닐경우 실행 
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    } 
}

function init(){
    loadCoords();
}

init();