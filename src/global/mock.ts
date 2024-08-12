import { COL, SHEETS } from ".";

export const extJest = {
  mocks: [],
  makeMock: (parent: Object, prop: string): jest.Mock => {
    const bak = Object.assign({}, parent)[prop];
    extJest.mocks.push({ parent, prop, bak });
    parent[prop] = jest.fn();
    return parent[prop];
  },
};

afterEach(() => {
  extJest.mocks.reverse().forEach((mock) => mock.parent[mock.prop] = mock.bak);
  extJest.mocks = [];
  globalThis.AppsScriptHttpRequestEvent.reset();
  (globalThis.SpreadsheetApp as any).reset();
});

globalThis.AppsScriptHttpRequestEvent = {
  parameter: {},
  setParam: (key: string, value: string) => {
    globalThis.AppsScriptHttpRequestEvent.parameter[key] = value;
  },
  reset: () => globalThis.AppsScriptHttpRequestEvent.parameter = {},
} as any;

globalThis.ContentService = {
  jestResult: {},
  MimeType: {
    JAVASCRIPT: 'JAVASCRIPT',
    JSON: 'JSON',
  },
  createTextOutput: (content: string) => {
    ((globalThis.ContentService) as any).jestResult.content = content;
    return globalThis.ContentService;
  },
  setMimeType: (mime: string) => {
    ((globalThis.ContentService) as any).jestResult.mime = mime;
    return globalThis.ContentService;
  },
} as any;

globalThis.SpreadsheetApp = {
  openById: (spreadsheetId: string) => ({
    getSheetByName: (sheetName: string) => {
      (globalThis.SpreadsheetApp as any).setActiveSheetName(sheetName);
      if (Mock.getBaseRecords(sheetName).length === 0) return null;
      return (globalThis.SpreadsheetApp as any).getSheetByName;
    },
  }),
  getSheetByName: {
    getDataRange: () => (globalThis.SpreadsheetApp as any).getDataRange,
  },
  getDataRange: {
    getValues: () => Mock.getValuesBySheet((globalThis.SpreadsheetApp as any).getActiveSheetName()),
  },
  activeSheetName: null,
  getActiveSheetName: () => (globalThis.SpreadsheetApp as any).activeSheetName ?? SHEETS.SCRIPTS,
  setActiveSheetName: (sheetName: string) => (globalThis.SpreadsheetApp as any).activeSheetName = sheetName,
  recordsNumber: null,
  getRecordsNumber: () => (globalThis.SpreadsheetApp as any).recordsNumber ?? 1,
  setRecordsNumber: (number: number) => (globalThis.SpreadsheetApp as any).recordsNumber = number,
  reset: () => {
    (globalThis.SpreadsheetApp as any).activeSheetName = null;
    (globalThis.SpreadsheetApp as any).recordsNumber = null;
  },
} as any;

export const Mock = {
  getBaseRecords: (sheetName?: string): Array<string> => {
    const map: any = {
      [SHEETS.SCRIPTS]: [COL.SCRIPT_NAME, COL.COMMAND],
    };

    return sheetName == null ? map : map[sheetName] ?? [];
  },
  getValuesBySheet: (sheetName: string): Array<Array<string>> => {
    const map = Mock.getBaseRecords();
    if (map[sheetName] == null) return [[]];

    const values = (keys: Array<string>) => {
      const records = [keys];
      const recordsNumber = (globalThis.SpreadsheetApp as any).getRecordsNumber();
      for (let i = 1; i <= recordsNumber; ++i) {
        records.push(keys.map((key: string) => `${i}${key}/${sheetName}`));
      }
      return records;
    };
    return values(Mock.getBaseRecords(sheetName));
  },
};
