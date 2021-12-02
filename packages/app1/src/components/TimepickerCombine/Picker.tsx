import React from 'react';
import moment from 'moment';
import { Radio } from 'antd';
import classNames from 'classnames';
import { DatePicker } from '@firesoon/ant-ui';
import { MonthPickerProps } from 'antd/es/date-picker/interface';
import { QUARTERS, FORMATQUARTERS } from '@/utils/constant';
import { TimePickerCombineProps } from './index';
import styles from './index.less';

const { MonthPicker, QuarterPicker, YearPicker } = DatePicker;

const defaultNames = [
  {
    key: 'year',
    value: '年',
  }, {
    key: 'quarter',
    value: '季度'
  }, {
    key: 'month',
    value: '月',
  }];

export default (props: TimePickerCombineProps) => {
  const { names = defaultNames, onChange, selected, handleTime, times, className } = props;
  const disabledDate = (current) => current > moment().endOf('day');

  const monthOption: MonthPickerProps = {
    className: styles.width,
    onChange: handleTime,
    allowClear: false,
    value: times['month'],
    disabledDate: disabledDate,
    placeholder: '选择月份',
  };

  const yearOption = {
    className: styles.width,
    onChange: handleTime,
    value: times['year'],
    allowClear: false,
    getPopupContainer: n => n,
  };

  return (
    <div className={classNames(styles.combine, className)}>
      <label>选择时间：</label>
      <Radio.Group
        buttonStyle="solid"
        className={styles.offsetLeft}
        onChange={onChange}
        defaultValue={selected}
      >
        {names.map(v => (
          <Radio.Button key={v.key} value={v.key}>{v.value}</Radio.Button>
        ))}
      </Radio.Group>
      {selected === 'month' &&
        <MonthPicker
          {...monthOption}
        />
      }
      {selected === 'quarter' &&
        <QuarterPicker
          formatQuarters={FORMATQUARTERS}
          quarters={QUARTERS}
          year={times['quarter'].year}
          quarter={times['quarter'].quarter}
          onChange={handleTime}
        />
      }
      {selected === 'year' &&
        <YearPicker
          {...yearOption}
        />
      }
    </div>
  );
};
