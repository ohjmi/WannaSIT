import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const insertCar = async () => {
  const connection = await mysql.createConnection();
};