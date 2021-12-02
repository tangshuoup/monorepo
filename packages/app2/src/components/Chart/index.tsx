import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

const style = { height: '100%', width: '100%' };
type IObj = { [key: string]: any };
interface IProps {
  option: any;
  notMerge: boolean;
  style: IObj;
  lazyUpdate: boolean;
  className: string;
  theme: string;
  onChartReady: Function;
  loadingOption: IObj;
  showLoading: boolean;
  onEvents: { [key: string]: Function };
  opts: IObj;
}
export default React.forwardRef<Partial<IProps>, any>((props, ref) => {
  return <ReactEchartsCore style={style} echarts={echarts} ref={ref} {...props} />;
});

export { default as BarChart } from './Bar';
export { default as LineChart } from './Line';
export { default as ScatterChart } from './Scatter';
