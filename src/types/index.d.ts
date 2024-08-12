type PlainObject<T> = Record<string, T>;
type ObjectKey = string | number;
type CellValue = string | number | boolean;
type DataRecordValue = CellValue;
type DataRecord = PlainObject<DataRecordValue>;
type DataRecords = Array<DataRecord>;
