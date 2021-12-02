import React from 'react';
import { ReactEchartsPropsTypes } from 'echarts-for-react/lib';
import { merge } from 'lodash';
import { ECHART_COLOR } from '@/utils/constant';
import BaseChart from './';

interface ILine extends ReactEchartsPropsTypes {
  hasArea?: boolean; // 是否有渐变
}

class LineBasicEchart extends React.Component<ILine, any> {
  static defaultProps = {
    hasArea: true,
  };

  render() {
    const { option, hasArea, ...others } = this.props;
    const defaultOption = {
      title: {
        textStyle: {
          fontSize: 14,
        },
      },
      color: [...ECHART_COLOR],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        textStyle: {
          color: '#000',
        },
      },
      xAxis: {
        type: 'category',
        data: [],
        minInterval: 1,
        // 坐标轴两边留白策略
        boundaryGap: true,
        // 分隔线
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        name: '',
        splitLine: {
          show: false,
        },
      },
      grid: {
        top: '40',
        bottom: option.legend && option.legend.hasOwnProperty('show') && !option.legend.show ? '10' : '40',
        right: '20',
        left: '60',
        containLabel: true,
      },
      series: [
        {
          data: [],
          type: 'line',
        },
      ],
      legend: {
        bottom: '0',
        itemWidth: 20,
        itemHeight: 12,
      },
    };

    const newOption = merge(defaultOption, option);

    newOption.series = newOption.series.map((item, i) => {
      const result = {
        type: 'line',
      } as any;
      if (hasArea) {
        // 默认x轴到值的位置，特殊方向渐变可通过改变x,y,x2,y2进行设置
        result.areaStyle = {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: ECHART_COLOR[i], // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        };
      }

      return { ...result, ...item };
    });

    return <BaseChart option={newOption} notMerge={true} {...others} />;
  }
}

export default LineBasicEchart;
