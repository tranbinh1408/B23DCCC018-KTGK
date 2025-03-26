import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip, Tag } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { KhoaHoc } from '@/services/Khoahoc/typing';

const DanhSachKhoaHocPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('khoahoc');

  const columns: IColumn<KhoaHoc.IRecord>[] = [
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      width: 120,
      filterType: 'string',
      search: 'search'
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      width: 250,
      filterType: 'string',
      search: 'search'
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
      width: 200,
      filterType: 'select'
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'soLuongHocVien',
      width: 150,
      align: 'center',
      sortable: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 120,
      align: 'center',
      filterType: 'select',
      filterData: Object.values(KhoaHoc.ETrangThaiKhoaHoc),
      render: (val: KhoaHoc.ETrangThaiKhoaHoc) => (
        <Tag color={KhoaHoc.TrangThaiKhoaHocMap[val].color}>
          {KhoaHoc.TrangThaiKhoaHocMap[val].label}
        </Tag>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 150,
      align: 'center',
      render: (val) => moment(val).format('HH:mm DD/MM/YYYY')
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (record: KhoaHoc.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button 
              onClick={() => handleEdit(record)} 
              type="link" 
              icon={<EditOutlined />} 
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa khóa học này?"
              placement="topLeft"
            >
              <Button 
                danger 
                type="link" 
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="khoahoc"
      title="Danh sách khóa học"
      Form={Form}
      buttons={{
        create: true,
        reload: true,
        filter: true
      }}
    />
  );
};

export default DanhSachKhoaHocPage;