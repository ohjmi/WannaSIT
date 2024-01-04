import fs from "fs";

function getStations(filePath) {
  const stationsJSON = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const stations = Object.values(stationsJSON);
  return stations;
}

function getDirectionAndRoute(startStation, endStation, stations) {
  const startIndex = stations.indexOf(startStation);
  const endIndex = stations.indexOf(endStation);
  const lastIndex = stations.length - 1;

  let direction;
  let route = [];

  // 리팩토링 필요
  if (startIndex < endIndex) {
    if (endIndex - startIndex < lastIndex - endIndex + startIndex) {
      // 내선
      // 서울대입구 -> 신도림
      direction = 1;
      route.push(...stations.slice(startIndex, endIndex + 1));
    } else {
      // 외선
      // 을지로입구 -> 아현
      direction = 0;
      route.push(...stations.slice(0, startIndex + 1).reverse());
      route.push(...stations.slice(endIndex).reverse());
    }
  } else {
    if (startIndex - endIndex < lastIndex - startIndex + endIndex) {
      // 신도림 -> 서울대입구
      // 외선
      direction = 0;
      route.push(...stations.slice(endIndex, startIndex + 1).reverse());
    } else {
      // 내선
      // 아현 -> 을지로입구
      direction = 1;
      route.push(...stations.slice(startIndex));
      route.push(...stations.slice(0, endIndex + 1));
    }
  }

  const result = {
    direction,
    route,
  };

  return result;
}

export { getStations, getDirectionAndRoute };
