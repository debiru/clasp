import { SHEETS } from "../global";
import { Sheet } from "../Sheet";
import { Util } from "../Util";

export const Entrypoint = {
  doGet(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
    return Entrypoint.doMain(e);
  },

  doPost(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
    return Entrypoint.doMain(e);
  },

  /**
   * the "e" argument represents an event parameter that can contain information about any URL parameters.
   * refs. https://developers.google.com/apps-script/guides/web
   */
  doMain(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
    return Entrypoint.makeContent(
      Entrypoint.makeResponse(e, () => Entrypoint.makeFormattedObject(e.parameter.type))
    );
  },

  makeFormattedObject(type: string) {
    const keyValueData = Entrypoint.makeObject();
    // If you want another JSON format, convert the data structure here.
    // (ex.) if (type === 'figma') return Formatter.figmaFormatter(keyValueData);
    return keyValueData;
  },

  makeObject() {
    const jsonObj = Util.objMap(SHEETS, (value: string) => Sheet.getRecords(value), (value: string) => value);
    return jsonObj;
  },

  makeResponse(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent, callback: CallableFunction) {
    const data = callback();
    const json = Util.toJSON(data);

    const useJsonp = !Util.empty(e.parameter.callback);
    const response = {
      mime: useJsonp ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON,
      content: (useJsonp ? Util.sprintf('%s(%s);', e.parameter.callback, json) : json) + '\n',
    };

    return response;
  },

  makeContent(response: { mime: GoogleAppsScript.Content.MimeType, content: string }) {
    return ContentService.createTextOutput(response.content).setMimeType(response.mime);
  },
};
