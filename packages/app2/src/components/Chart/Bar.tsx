import React from 'react';
import { ReactEchartsPropsTypes } from 'echarts-for-react/lib';
import { merge } from 'lodash';
import { ECHART_COLOR } from '@/utils/constant';
import BaseChart from './';

interface ObjMap {
  value: number | string;
  itemStyle?: object;
}

interface ICharts extends ReactEchartsPropsTypes {
  hasMinHeight?: boolean;
}

export default class Charts extends React.Component<ICharts, any> {
  // 处理数据项，使得数据为0时，没有最小高度
  handleData = (data = []) => {
    // data一定是数组
    return data.map((v: ObjMap | number | string) => {
      if (typeof v === 'object') {
        // data = [{ value, ...}]
        return {
          ...v,
          // 立即执行函数，通过数据值返回对应的透明度
          itemStyle: (() => ({
            opacity: v.value === 0 ? 0 : 1,
            ...v.itemStyle,
          }))(),
        };
      } else {
        // data = [1, 2, ...]
        return {
          value: v,
          itemStyle: (() => ({
            opacity: v === 0 ? 0 : 1,
          }))(),
        };
      }
    });
  };

  render() {
    const defaultOption = {
      color: ECHART_COLOR.slice(),
      title: {
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: ECHART_COLOR[0],
            opacity: '0.2',
          },
        },
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        textStyle: {
          color: '#000',
        },
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        // 坐标轴两边留白策略
        boundaryGap: true,
        data: [],
        minInterval: 1,
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        name: '',
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      grid: {
        top: 40,
        right: 0,
        left: 5,
        containLabel: true,
      },
      series: [
        {
          data: [],
          type: 'bar',
        },
      ],
      legend: {
        bottom: '0',
        itemWidth: 20,
        itemHeight: 12,
      },
    };
    const { option, hasMinHeight, ...others } = this.props;

    const chartOption = merge(defaultOption, option);

    chartOption.series = chartOption.series.map((item) => ({
      type: 'bar',
      barMaxWidth: 24,
      ...item,
      // 数据为0 通过设置opacity=0 无最小高度
      data: hasMinHeight ? this.handleData(item.data) : item.data,
      // 设置最小高度
      barMinHeight: hasMinHeight ? 10 : 0,
    }));

    return <BaseChart {...others} option={chartOption} />;
  }
}
