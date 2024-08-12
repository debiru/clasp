import '../global/mock';
import { extJest, Mock } from '../global/mock';

import { Sheet } from '.';
import { SHEETS } from '../global';

describe('Sheet.spec', () => {
  describe('Success of Sheet methods', () => {
    it('getCells() has exist sheetName', () => {
      const result = Sheet.getCells(SHEETS.SCRIPTS);
      expect(result).not.toBeNull();
    });

    it('getRecords() has exist sheetName', () => {
      const result = Sheet.getRecords(SHEETS.SCRIPTS);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('getHeaders() has exist sheetName', () => {
      const result = Sheet.getHeaders(SHEETS.SCRIPTS);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Special cases', () => {
    it('getRecords() removes empty columns', () => {
      const originalGetValuesBySheet = Mock.getValuesBySheet;
      extJest.makeMock(Mock, 'getValuesBySheet').mockImplementation((sheetName: string) => {
        const values = originalGetValuesBySheet(sheetName);
        return values.map(row => row.map(col => col.replace(/\d+command\/scripts/, '')));
      });
      const result = Sheet.getRecords(SHEETS.SCRIPTS);
      expect(result).toEqual([{ scriptName: '1scriptName/scripts' }]);
    });
  });

  describe('Exception of Sheet methods', () => {
    it('getCells() does not have exist sheetName', () => {
      const result = Sheet.getCells(SHEETS.UNKNOWN);
      expect(result).toBeNull();
    });

    it('getRecords() does not have exist sheetName', () => {
      const result = Sheet.getRecords(SHEETS.UNKNOWN);
      expect(result).toBeNull();
    });

    it('getHeaders() does not have exist sheetName', () => {
      const result = Sheet.getHeaders(SHEETS.UNKNOWN);
      expect(result).toBeNull();
    });
  });
});
