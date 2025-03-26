import { useState } from 'react';
import { KhoaHoc } from '@/services/KhoaHoc/typing';
import { KhoaHocService } from '@/services/KhoaHoc';
import { message } from 'antd';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [danhSach, setDanhSach] = useState<KhoaHoc.IRecord[]>([]);
  const [record, setRecord] = useState<KhoaHoc.IRecord>();
  const [visible, setVisible] = useState<boolean>(false);

  const getData = () => {
    setLoading(true);
    try {
      const data = KhoaHocService.getAll();
      setDanhSach(data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const createKhoaHoc = async (values: Omit<KhoaHoc.IRecord, 'id' | 'createdAt'>) => {
    try {
      KhoaHocService.create(values);
      message.success('Thêm khóa học thành công');
      getData();
      setVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const updateKhoaHoc = async (id: string, values: Partial<KhoaHoc.IRecord>) => {
    try {
      KhoaHocService.update(id, values);
      message.success('Cập nhật thành công');
      getData();
      setVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const deleteKhoaHoc = async (id: string) => {
    try {
      KhoaHocService.delete(id);
      message.success('Xóa thành công');
      getData();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  return {
    loading,
    danhSach,
    record,
    visible,
    setVisible,
    setRecord,
    getData,
    createKhoaHoc,
    updateKhoaHoc,
    deleteKhoaHoc
  };
};