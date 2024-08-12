import './mock';
import { SID } from '.';

describe('Global Definitions', () => {
  it('SID is not empty', () => {
    expect(SID).not.toBeFalsy();
  });
});
