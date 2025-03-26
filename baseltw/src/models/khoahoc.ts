import { useState, useCallback } from 'react';
import { message } from 'antd';
import { 
  getKhoaHoc, 
  themKhoaHoc, 
  capNhatKhoaHoc, 
  xoaKhoaHoc, 
  initKhoaHocData,
  getKhoaHocById
} from '@/services/KhoaHoc';
import type { KhoaHoc, KhoaHocParams } from '@/services/KhoaHoc/typing.d';

export default () => {
  const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState<KhoaHoc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentKhoaHoc, setCurrentKhoaHoc] = useState<KhoaHoc | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'them' | 'sua'>('them');
  
  // Khởi tạo dữ liệu mẫu
  useCallback(() => {
    initKhoaHocData();
  }, []);
  
  // Lấy danh sách khóa học
  const fetchDanhSachKhoaHoc = useCallback(async (params?: KhoaHocParams) => {
    setLoading(true);
    try {
      const data = getKhoaHoc(params);
      setDanhSachKhoaHoc(data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Mở modal thêm khóa học
  const showThemKhoaHoc = useCallback(() => {
    setCurrentKhoaHoc(undefined);
    setModalType('them');
    setModalVisible(true);
  }, []);
  
  // Mở modal sửa khóa học
  const showSuaKhoaHoc = useCallback((id: string) => {
    const khoaHoc = getKhoaHocById(id);
    setCurrentKhoaHoc(khoaHoc);
    setModalType('sua');
    setModalVisible(true);
  }, []);
  
  // Đóng modal
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  
  // Thêm khóa học mới
  const handleThemKhoaHoc = useCallback(async (values: Omit<KhoaHoc, 'id'>) => {
    try {
      const result = themKhoaHoc(values);
      if (result.success) {
        message.success('Thêm khóa học thành công');
        closeModal();
        fetchDanhSachKhoaHoc();
      } else {
        message.error(result.message || 'Thêm khóa học thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm khóa học');
    }
  }, [closeModal, fetchDanhSachKhoaHoc]);
  
  // Cập nhật khóa học
  const handleCapNhatKhoaHoc = useCallback(async (values: KhoaHoc) => {
    try {
      const result = capNhatKhoaHoc(values);
      if (result.success) {
        message.success('Cập nhật khóa học thành công');
        closeModal();
        fetchDanhSachKhoaHoc();
      } else {
        message.error(result.message || 'Cập nhật khóa học thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật khóa học');
    }
  }, [closeModal, fetchDanhSachKhoaHoc]);
  
  // Xóa khóa học
  const handleXoaKhoaHoc = useCallback(async (id: string) => {
    try {
      const result = xoaKhoaHoc(id);
      if (result.success) {
        message.success('Xóa khóa học thành công');
        fetchDanhSachKhoaHoc();
      } else {
        message.error(result.message || 'Xóa khóa học thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa khóa học');
    }
  }, [fetchDanhSachKhoaHoc]);
  
  return {
    danhSachKhoaHoc,
    loading,
    currentKhoaHoc,
    modalVisible,
    modalType,
    fetchDanhSachKhoaHoc,
    showThemKhoaHoc,
    showSuaKhoaHoc,
    closeModal,
    handleThemKhoaHoc,
    handleCapNhatKhoaHoc,
    handleXoaKhoaHoc,
  };
}; 