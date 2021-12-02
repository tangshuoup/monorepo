import Picker from './Picker';

interface Names {
  key: string;
  value: string;
}

export interface TimePickerCombineProps {
  names?: Array<Names>;
  onChange: (e) => void;
  selected: string;
  handleTime: (time: object) => void;
  times: Object;
  className?: string;
}

export default Picker;
