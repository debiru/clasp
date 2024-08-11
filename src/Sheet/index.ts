import { SID } from '../global';

export const Sheet = {
  get(sheetName: string) {
    return SpreadsheetApp.openById(SID).getSheetByName(sheetName);
  },

  getCells(sheetName: string) {
    const sheet = Sheet.get(sheetName);
    if (sheet == null) return null;
    return sheet.getDataRange().getValues() as Array<Array<CellValue>>;
  },

  getRecords(sheetName: string) {
    const cells = Sheet.getCells(sheetName);
    if (cells == null) return null;

    // values[row][col] を records[row][key] のオブジェクト配列に変換
    const keys = cells.shift();
    const records = cells.map((row: Array<CellValue>) => {
      const obj = {};
      row.forEach((cell: CellValue, i: number) => {
        obj[String(keys[i])] = cell;
      });
      return obj;
    });

    // 値が全て空の列があれば key から除外する
    keys.forEach((key: string) => {
      const set = new Set();
      records.forEach((record: DataRecord) => set.add(record[key]));
      if (set.size === 1 && set.has('')) {
        records.map((record: DataRecord) => {
          delete(record[key]);
          return record;
        });
      }
    });

    return records as DataRecords;
  },

  getHeaders(sheetName: string) {
    const cells = Sheet.getCells(sheetName);
    if (cells == null) return null;
    return cells.shift().map((v: CellValue) => String(v));
  },
};
