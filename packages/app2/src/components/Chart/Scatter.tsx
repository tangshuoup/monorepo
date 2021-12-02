/*
散点图-四象限图
 */

import React from 'react';
import BaseChart from './';
import { merge } from 'lodash';

export default ({
  seriesData,
  xCenter, // 四象限图的中心x
  yCenter, // 四象限图的中心y
  option = {},
  ...rest
}) => {
  const defaultOption: {[key: string]: any} = {
    color: ['rgba(51, 103, 214, .5)'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#e2e2e2',
      textStyle: {
        color: '#000',
      },
      padding: 10,
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty',
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty',
        right: 16,
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'empty'
      }
    ],
    grid: {
      left: 20,
      right: 100,
      top: 40,
      bottom: 50,
      containLabel: true,
    },
    visualMap: [
      {
        show: false,
        left: 'right',
        top: '10%',
        // 需要映射圆形大小的数据列
        dimension: 2,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        precision: 0.1,
        text: ['圆形大小'],
        padding: [30, 0, 0, 30],
        textGap: 20,
        textStyle: {
          color: '#000'
        },
        inRange: {
          symbolSize: [10, 70]
        },
        outOfRange: {
          symbolSize: [10, 70],
          color: ['rgba(255, 255, 255, .2)']
        },
        controller: {
          inRange: {
            color: ['rgba(51, 103, 214, .5)']
          },
          outOfRange: {
            color: ['#e1e1e1']
          }
        }
      },

    ],
    xAxis: {
      type: 'value',
      scale: true,
      nameTextStyle: {
        color: 'transparent'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e1e1e1'
        }
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      min: (value) => {
        const ret = adjustMinMax(value, xCenter);
        return toFixed(ret.min);
      },
      max: (value) => {
        const ret = adjustMinMax(value, xCenter);
        return toFixed(ret.max);
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      min: (value) => {
        const ret = adjustMinMax(value, yCenter);
        return toFixed(ret.min);
      },
      max: (value) => {
        const ret = adjustMinMax(value, yCenter);
        return toFixed(ret.max);
      },
      nameTextStyle: {
        color: 'transparent'
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e1e1e1'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    series: {
      type: 'scatter',
      label: {
        show: true,
        formatter: '{b}',
        // color: '#000'
      },
      markLine: {
        animation: false,
        lineStyle: {
          color: '#000',
          type: 'solid',
          width: 2,
        },
        label: {
          show: true,
          position: 'start',
          formatter: '{b}',
          fontSize: 11,
          color: '#666',
        },
        // 起 止
        symbol: ['none', 'none'],
        silent: true,
        data: [{
          xAxis: xCenter,
        }, {
          yAxis: yCenter,
        }]
      }
    },
  };
  defaultOption.series.data = seriesData;
  const nextOpt = merge(defaultOption, option);

  return (
    <BaseChart
      {...rest}
      option={nextOpt}
    />
  );
};

function adjustMinMax(value, center) {
  const { min, max } = value;
  let mid = center;

  // 初始值根据服务端返回时，设置Infinity进行标识
  if (!isFinite(center)) {
    mid = 0;
  }
  // 无数据时，随便取一个
  if (!isFinite(min)) {
    return {
      max: mid + 2,
      min: mid - 2,
    };
  }

  const right = Math.abs(max - mid);
  const left = Math.abs(mid - min);

  const distance = Math.max(right, left);
  const nextMax = mid + distance;
  const nextMin = mid - distance;

  return {
    max: nextMax,
    min: nextMin,
  };
}

function toFixed(num) {
  return Number(num.toFixed(2));
}
