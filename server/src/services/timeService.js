// 현재 시간을 가져오는 함수
function getTime() {
  const date = new Date();

  const dowText = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const day = dowText[date.getDay()];
  const arrivalHour = date.getHours();
  const arrivalMin = date.getMinutes();

  return { day, arrivalHour, arrivalMin };
}

// 분 대 계산 함수
function truncateToNearestTen(min) {
  return Math.trunc(min / 10) * 10;
}

export { getTime, truncateToNearestTen };
