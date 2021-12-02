/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-11-30 14:55:46
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-02 17:10:18
 */
import { dynamic } from 'umi';

// const Loading = dynamic({
//   loader: async function () {
//     const { default: HugeA } = await import('subApp/Loading');
//     return HugeA;
//   },
// });


import { HelloWord } from '@shuotest/components'

console.log('HelloWord', HelloWord)
export default function Index (){
  return <div className='index'>首页 
    <HelloWord />
  </div>;
};
