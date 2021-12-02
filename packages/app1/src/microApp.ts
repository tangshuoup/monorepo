/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-12-01 15:26:10
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-01 15:26:10
 */
function microApp(entryPrefix) {
  return [
    {
      name: 'subApp',
      entry: entryPrefix ? `${entryPrefix}/subApp` : '//localhost:3001',
    }
  ]
}
export default microApp;