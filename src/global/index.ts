import clasp from '../../.clasp.json';
export const SID = clasp.spreadsheetId;

export const SHEETS = {
  SCRIPTS: 'scripts',
  UNKNOWN: 'unknown',
};

export const COL = {
  SCRIPT_NAME: 'scriptName',
  COMMAND: 'command',
  UNKNOWN: 'unknown',
};

export const JSON_FIELDS = {
  [SHEETS.SCRIPTS]: SHEETS.SCRIPTS,
};
