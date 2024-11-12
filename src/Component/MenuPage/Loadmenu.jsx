// src/utils/loadMenuData.js
import * as XLSX from 'xlsx';

export const loadMenuData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];  // Get the first sheet
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON format
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      resolve(parsedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);  // Reads the file as an array buffer
  });
};
