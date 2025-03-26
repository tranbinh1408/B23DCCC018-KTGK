import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Space, 
  Select, 
  Tag, 
  Popconfirm, 
  Typography,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import type { KhoaHoc } from '@/services/KhoaHoc/typing.d';
import { danhSachGiangVien } from '@/services/KhoaHoc';
import KhoaHocForm from './components/Form';
import GiangVienSelect from './components/Select';

const { Title } = Typography;
const { Option } = Select;

const KhoaHocPage: React.FC = () => {
  const {
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
  } = useModel('khoahoc');
  
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    giangVien: undefined,
    trangThai: undefined,
    sortField: undefined,
    sortOrder: undefined,
  });
  
  useEffect(() => {
    fetchDanhSachKhoaHoc();
  }, [fetchDanhSachKhoaHoc]);
  
  const handleSearch = () => {
    fetchDanhSachKhoaHoc(searchParams);
  };
  
  const handleReset = () => {
    setSearchParams({
      keyword: '',
      giangVien: undefined,
      trangThai: undefined,
      sortField: undefined,
      sortOrder: undefined,
    });
    fetchDanhSachKhoaHoc();
  };
  
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const newParams = { ...searchParams };
    
    if (sorter.field === 'soLuongHocVien' && sorter.order) {
      newParams.sortField = 'soLuongHocVien';
      newParams.sortOrder = sorter.order;
    } else {
      newParams.sortField = undefined;
      newParams.sortOrder = undefined;
    }
    
    setSearchParams(newParams);
    fetchDanhSachKhoaHoc(newParams);
  };
  
  const renderTrangThai = (trangThai: string) => {
    switch (trangThai) {
      case 'DANG_MO':
        return <Tag color="green">Đang mở</Tag>;
      case 'DA_KET_THUC':
        return <Tag color="red">Đã kết thúc</Tag>;
      case 'TAM_DUNG':
        return <Tag color="orange">Tạm dừng</Tag>;
      default:
        return null;
    }
  };
  
  const renderGiangVien = (giangVienId: string) => {
    const giangVien = danhSachGiangVien.find(gv => gv.id === giangVienId);
    return giangVien ? giangVien.ten : '';
  };
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      ellipsis: true,
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
      key: 'giangVien',
      render: (giangVienId: string) => renderGiangVien(giangVienId),
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'soLuongHocVien',
      key: 'soLuongHocVien',
      sorter: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: string) => renderTrangThai(trangThai),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record: KhoaHoc) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showSuaKhoaHoc(record.id)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khóa học này?"
            onConfirm={() => handleXoaKhoaHoc(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            disabled={record.soLuongHocVien > 0}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              disabled={record.soLuongHocVien > 0}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Card>
        <Title level={2}>Quản lý khóa học</Title>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="Tìm kiếm theo tên khóa học"
              value={searchParams.keyword}
              onChange={e => setSearchParams({ ...searchParams, keyword: e.target.value })}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <GiangVienSelect
              value={searchParams.giangVien}
              onChange={value => setSearchParams({ ...searchParams, giangVien: value })}
              placeholder="Lọc theo giảng viên"
              style={{ width: '100%' }}
            />
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="Lọc theo trạng thái"
              value={searchParams.trangThai}
              onChange={value => setSearchParams({ ...searchParams, trangThai: value })}
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="DANG_MO">Đang mở</Option>
              <Option value="DA_KET_THUC">Đã kết thúc</Option>
              <Option value="TAM_DUNG">Tạm dừng</Option>
            </Select>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space>
              <Button type="primary" onClick={handleSearch}>
                Tìm kiếm
              </Button>
              <Button onClick={handleReset}>Đặt lại</Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showThemKhoaHoc}
              >
                Thêm mới
              </Button>
            </Space>
          </Col>
        </Row>
        
        <Table
          columns={columns}
          dataSource={danhSachKhoaHoc}
          rowKey="id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: total => `Tổng cộng ${total} khóa học`,
          }}
        />
      </Card>
      
      <KhoaHocForm
        visible={modalVisible}
        type={modalType}
        initialValues={currentKhoaHoc}
        onCancel={closeModal}
        onSubmit={modalType === 'them' ? handleThemKhoaHoc : handleCapNhatKhoaHoc}
      />
    </div>
  );
};

export default KhoaHocPage; 