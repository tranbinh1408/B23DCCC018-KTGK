import React from 'react';
import { Select } from 'antd';
import { danhSachGiangVien } from '@/services/KhoaHoc';

const { Option } = Select;

interface GiangVienSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  allowClear?: boolean;
}

const GiangVienSelect: React.FC<GiangVienSelectProps> = ({
  value,
  onChange,
  placeholder = 'Chọn giảng viên',
  style,
  allowClear = true,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      allowClear={allowClear}
    >
      {danhSachGiangVien.map(gv => (
        <Option key={gv.id} value={gv.id}>
          {gv.ten}
        </Option>
      ))}
    </Select>
  );
};

export default GiangVienSelect; 