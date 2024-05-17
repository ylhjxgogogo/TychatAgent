import { createJsonTranslator, createLanguageModel } from "typechat";
import { createTypeScriptJsonValidator } from "typechat/ts";
//schema必须是一个字符串
export async function aiTranslate(env, value, schema, schemaName) {
  const model = createLanguageModel(env);

  //   const schema = `export interface DataItem {
  //     type: "add" | "delete" | "update";
  //     name: string;
  //     age: number;
  //     address: string;
  //   }
  //   export interface DataItemArr{
  //       DataList:Array<DataItem>
  //   }

  // `;
  const validator = createTypeScriptJsonValidator(schema, schemaName);
  const translator = createJsonTranslator(model, validator);

  const response = await translator.translate(value);
  if (!response.success) {
    console.log(response.message);
    return;
  }

  return response.data;
}
