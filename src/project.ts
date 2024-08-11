export * from './global';
import { Entrypoint } from './Entrypoint';
import { Sheet } from './Sheet';
import { Util } from './Util';

// Export Functions to Global
const variables = { Entrypoint, Sheet, Util };
import { Export } from './global/export';
Object.entries(Export).forEach(([namespace, functionNameList]: [string, Array<string>]) => {
  functionNameList.forEach((functionName: string) => {
    globalThis[functionName] = variables[namespace][functionName];
  });
});
