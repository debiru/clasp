import '../global/mock';

import { Util } from '.';

describe('Util.spec', () => {
  const valuesTable = [null, undefined, '', false, true, 0, '0', () => 0, [], {}];

  describe('toJSON', () => {
    it('success', () => {
      expect(Util.toJSON({ a: 1, b: 'b' })).toBe('{\n  "a": 1,\n  "b": "b"\n}');
    });
  });

  describe('empty', () => {
    it('success', () => {
      const result = valuesTable.map(v => Util.empty(v));
      const expectResult = [true, true, true, false, false, false, false, false, false, false];
      expect(result).toEqual(expectResult);
    });
  });

  describe('sprintf', () => {
    it('assign arguments', () => {
      expect(Util.sprintf('%s,%s', 1, 2)).toBe('1,2');
    });

    it('escape character', () => {
      expect(Util.sprintf('%%s', 1)).toBe('%s');
    });

    it('undefined placeholder', () => {
      expect(Util.sprintf('%d,%s', 1, 2)).toBe('%d,1');
    });
  });

  describe('objMap', () => {
    it('valueCallback', () => {
      const obj = {
        one: 1,
        two: 2,
        three: 3,
      };
      expect(Util.objMap(obj, (v: number) => v * 2)).toEqual({ one: 2, two: 4, three: 6 });
    });

    it('keyCallback', () => {
      const obj = {
        one: 1,
        two: 2,
        three: 3,
      };
      expect(Util.objMap(obj, null, (v: number, k: string) => `${k}_${v}`)).toEqual({ one_1: 1, two_2: 2, three_3: 3 });
    });
  });

  describe('arrayCombine', () => {
    it('1 argument', () => {
      expect(Util.arrayCombine(['a', 'b', 'c'])).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
    });

    it('2 arguments', () => {
      expect(Util.arrayCombine(['a', 'b', 'c'], ['x', 'y', 'z'])).toEqual({ a: 'x', b: 'y', c: 'z' });
    });
  });
});
