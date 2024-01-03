import fs from "fs";

async function readJsonFileValues(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.error(`파일 읽기 실패: ${error.message}`);
        reject(error);
      } else {
        resolve(Object.values(JSON.parse(data)));
      }
    });
  });
}

export { readJsonFileValues };
