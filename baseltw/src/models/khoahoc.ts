import { useState } from 'react';
import { KhoaHoc } from '@/services/KhoaHoc/typing';
import { KhoaHocService } from '@/services/KhoaHoc';
import { message } from 'antd';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [danhSach, setDanhSach] = useState<KhoaHoc.IRecord[]>([]);
  const [record, setRecord] = useState<KhoaHoc.IRecord>();
  const [visible, setVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

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

  const handleEdit = (rec: KhoaHoc.IRecord) => {
    setRecord(rec);
    setVisible(true);
  };

  const deleteModel = async (_id: string, callback?: () => void) => {
    try {
      KhoaHocService.delete(_id);
      message.success('Xóa thành công');
      if (callback) callback();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  return {
    loading,
    danhSach,
    record,
    visible,
    page,
    limit,
    setVisible,
    setRecord,
    getData,
    handleEdit,
    deleteModel
  };
};