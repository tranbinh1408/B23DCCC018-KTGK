import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import { danhSachGiangVien } from '@/services/KhoaHoc';
import type { KhoaHoc } from '@/services/KhoaHoc/typing.d';

const { TextArea } = Input;
const { Option } = Select;

interface KhoaHocFormProps {
  visible: boolean;
  type: 'them' | 'sua';
  initialValues?: KhoaHoc;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const KhoaHocForm: React.FC<KhoaHocFormProps> = ({
  visible,
  type,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);
  
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (type === 'sua' && initialValues) {
        onSubmit({ ...values, id: initialValues.id });
      } else {
        onSubmit(values);
      }
    });
  };
  
  return (
    <Modal
      title={type === 'them' ? 'Thêm khóa học mới' : 'Chỉnh sửa khóa học'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {type === 'them' ? 'Thêm mới' : 'Cập nhật'}
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          type === 'them' 
            ? { soLuongHocVien: 0, trangThai: 'DANG_MO' } 
            : initialValues
        }
      >
        <Form.Item
          name="tenKhoaHoc"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Vui lòng nhập tên khóa học' },
            { max: 100, message: 'Tên khóa học không được vượt quá 100 ký tự' },
          ]}
        >
          <Input placeholder="Nhập tên khóa học" />
        </Form.Item>
        
        <Form.Item
          name="giangVien"
          label="Giảng viên"
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
        >
          <Select placeholder="Chọn giảng viên">
            {danhSachGiangVien.map(gv => (
              <Option key={gv.id} value={gv.id}>
                {gv.ten}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="moTa"
          label="Mô tả khóa học"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học' }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả khóa học" />
        </Form.Item>
        
        <Form.Item
          name="trangThai"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="DANG_MO">Đang mở</Option>
            <Option value="DA_KET_THUC">Đã kết thúc</Option>
            <Option value="TAM_DUNG">Tạm dừng</Option>
          </Select>
        </Form.Item>
        
        {type === 'sua' && (
          <Form.Item
            name="soLuongHocVien"
            label="Số lượng học viên"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng học viên' },
              { 
                type: 'number', 
                min: 0, 
                message: 'Số lượng học viên không được âm' 
              },
            ]}
          >
            <Input type="number" placeholder="Nhập số lượng học viên" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default KhoaHocForm; 