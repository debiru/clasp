export const Util = {
  /**
   * 値を JSON 文字列に変換する。
   */
  toJSON(arg: unknown) {
    return JSON.stringify(arg, null, 2);
  },

  /**
   * null または undefined または空文字列であれば true を返す。
   */
  empty(arg: unknown) {
    return arg == null || arg === '';
  },

  /**
   * %s プレースホルダーのみに対応した sprintf 関数。
   */
  sprintf(format: string, ...args: any) {
    let p = 0;
    return format.replace(/%./g, function(m) {
      if (m === '%%') return '%';
      if (m === '%s') return args[p++];
      return m;
    });
  },

  /**
   * Object の key-value を新しい値で更新する。
   * obj の他に valueCallback と keyCallback を引数に取る。
   * callback 関数は引数に元の value と key をこの順に取る。
   */
  objMap(obj: PlainObject<any>, valueCallback?: CallableFunction, keyCallback?: CallableFunction) {
    if (valueCallback == null) valueCallback = (value: any) => value;
    if (keyCallback == null) keyCallback = (value: any, key: ObjectKey) => key;
    const ret: typeof obj = {};
    Object.entries(obj).forEach(([key, value]: [ObjectKey, any]) => ret[keyCallback(value, key)] = valueCallback(value, key));
    return ret;
  },

  /**
   * keyArray と valueArray から Object を作成する。
   * valueArray を指定しない場合、keyArray が使われる。
   */
  arrayCombine(keyArray: Array<any>, valueArray?: Array<any>) {
    if (valueArray == null) {
      valueArray = keyArray;
      keyArray = Object.keys(keyArray);
    }
    const ret: PlainObject<any> = {};
    for (let i = 0; i < keyArray.length; ++i) ret[keyArray[i]] = valueArray[i];
    return ret;
  },
};
