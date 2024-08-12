import '../global/mock';
import { Mock } from '../global/mock';

import { Entrypoint } from '.';
import { Util } from '../Util';

describe('Entrypoint.spec', () => {
  describe('Entrypoint Methods', () => {
    it('doGet() returns jestResult', () => {
      const result = Entrypoint.doGet(globalThis.AppsScriptHttpRequestEvent) as any;
      expect(result.jestResult.mime).toBe(globalThis.ContentService.MimeType.JSON);
      expect(typeof result.jestResult.content).toBe('string');
    });

    it('doPost() returns jestResult', () => {
      const result = Entrypoint.doPost(globalThis.AppsScriptHttpRequestEvent) as any;
      expect(result.jestResult.mime).toBe(globalThis.ContentService.MimeType.JSON);
      expect(typeof result.jestResult.content).toBe('string');
    });
  });

  describe('doMain', () => {
    it('doMain returns Key-Value JSON', () => {
      const result = Entrypoint.doMain(globalThis.AppsScriptHttpRequestEvent) as any;
      expect(result.jestResult.mime).toBe(globalThis.ContentService.MimeType.JSON);
      expect(JSON.parse(result.jestResult.content)).toEqual({
        scripts: [
          {
            scriptName: '1scriptName/scripts',
            command: '1command/scripts',
          },
        ],
      });
    });
  });

  describe('makeResponse', () => {
    it('makeResponse supports JSONP', () => {
      const callbackName = 'jsonpCallbackName';
      const content = { a: 'hello', b: 'world' };
      globalThis.AppsScriptHttpRequestEvent.setParam('callback', callbackName);
      const result = Entrypoint.makeResponse(globalThis.AppsScriptHttpRequestEvent, () => content);
      expect(result.mime).toBe(globalThis.ContentService.MimeType.JAVASCRIPT);
      expect(result.content).toBe(`${callbackName}(${Util.toJSON(content)});\n`);
    });
  });
});
