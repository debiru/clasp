import './mock';
import { extJest, Mock } from './mock';

import { SHEETS } from '.';
import { Entrypoint } from '../Entrypoint';
import { Sheet } from '../Sheet';

describe('mock.spec', () => {
  describe('Mocks are unmocked for each test case', () => {
    it('Mock doMain', () => {
      const doMain = extJest.makeMock(Entrypoint, 'doMain');
      const result = Entrypoint.doGet(globalThis.AppsScriptHttpRequestEvent);
      expect(result).toBeUndefined();
    });

    it('Subsequent tests', () => {
      const result = Entrypoint.doGet(globalThis.AppsScriptHttpRequestEvent);
      expect(result).not.toBeUndefined();
    });
  });

  describe('Query parameters are reset for each test case', () => {
    it('Set query parameter', () => {
      globalThis.AppsScriptHttpRequestEvent.setParam('callback', 'jsonp');
      const result = Entrypoint.doGet(globalThis.AppsScriptHttpRequestEvent) as any;
      expect(result.jestResult.mime).toBe(globalThis.ContentService.MimeType.JAVASCRIPT);
    });

    it('Subsequent tests', () => {
      const result = Entrypoint.doGet(globalThis.AppsScriptHttpRequestEvent) as any;
      expect(result.jestResult.mime).toBe(globalThis.ContentService.MimeType.JSON);
    });
  });

  describe('ActiveSheet is reset for each test case', () => {
    it('Set activeSheetName', () => {
      (globalThis.SpreadsheetApp as any).setActiveSheetName(SHEETS.UNKNOWN);
      const result = (globalThis.SpreadsheetApp as any).getActiveSheetName();
      expect(result).toBe(SHEETS.UNKNOWN);
    });

    it('Subsequent tests', () => {
      const result = (globalThis.SpreadsheetApp as any).getActiveSheetName();
      expect(result).toBe(SHEETS.SCRIPTS);
    });
  });

  describe('Check to see if Mock is broken', () => {
    it('Sheet.getActiveSheetInfo.cells', () => {
      for (let i = 0; i <= 10; ++i) {
        (globalThis.SpreadsheetApp as any).setRecordsNumber(i);
        const records = Sheet.getRecords(SHEETS.SCRIPTS);
        expect(records.length).toBe(i);
      }
    });
  });

  describe('Exception of methods', () => {
    it('SpreadsheetApp.getSheetByName', () => {
      expect((globalThis.SpreadsheetApp as any).openById(null).getSheetByName(SHEETS.UNKNOWN)).toBeNull();
    });

    it('Mock.getValuesBySheet', () => {
      expect(Mock.getValuesBySheet(SHEETS.UNKNOWN)).toEqual([[]]);
    });
  });
});
