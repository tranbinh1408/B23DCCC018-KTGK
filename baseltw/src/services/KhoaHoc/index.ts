import { KhoaHoc, KhoaHocParams, GiangVien } from './typing.d';

// Danh sách giảng viên mẫu
export const danhSachGiangVien: GiangVien[] = [
  { id: '1', ten: 'Nguyễn Văn A' },
  { id: '2', ten: 'Trần Thị B' },
  { id: '3', ten: 'Lê Văn C' },
  { id: '4', ten: 'Phạm Thị D' },
  { id: '5', ten: 'Hoàng Văn E' },
];

// Hàm lấy dữ liệu từ localStorage
export const getKhoaHocFromStorage = (): KhoaHoc[] => {
  const khoaHocData = localStorage.getItem('khoaHocData');
  if (khoaHocData) {
    return JSON.parse(khoaHocData);
  }
  return [];
};

// Hàm lưu dữ liệu vào localStorage
export const saveKhoaHocToStorage = (data: KhoaHoc[]) => {
  localStorage.setItem('khoaHocData', JSON.stringify(data));
};

// Hàm lấy danh sách khóa học với bộ lọc
export const getKhoaHoc = (params?: KhoaHocParams): KhoaHoc[] => {
  let data = getKhoaHocFromStorage();
  
  // Lọc theo từ khóa
  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase();
    data = data.filter(item => item.tenKhoaHoc.toLowerCase().includes(keyword));
  }
  
  // Lọc theo giảng viên
  if (params?.giangVien) {
    data = data.filter(item => item.giangVien === params.giangVien);
  }
  
  // Lọc theo trạng thái
  if (params?.trangThai) {
    data = data.filter(item => item.trangThai === params.trangThai);
  }
  
  // Sắp xếp
  if (params?.sortField) {
    data = [...data].sort((a, b) => {
      if (params.sortField === 'soLuongHocVien') {
        return params.sortOrder === 'ascend' 
          ? a.soLuongHocVien - b.soLuongHocVien 
          : b.soLuongHocVien - a.soLuongHocVien;
      }
      return 0;
    });
  }
  
  return data;
};

// Hàm thêm khóa học mới
export const themKhoaHoc = (khoaHoc: Omit<KhoaHoc, 'id'>): { success: boolean; message?: string } => {
  const data = getKhoaHocFromStorage();
  
  // Kiểm tra tên khóa học trùng
  const isTenTrung = data.some(item => item.tenKhoaHoc === khoaHoc.tenKhoaHoc);
  if (isTenTrung) {
    return { success: false, message: 'Tên khóa học đã tồn tại!' };
  }
  
  // Tạo ID mới
  const newId = Date.now().toString();
  
  // Thêm khóa học mới
  const newData = [...data, { ...khoaHoc, id: newId }];
  saveKhoaHocToStorage(newData);
  
  return { success: true };
};

// Hàm cập nhật khóa học
export const capNhatKhoaHoc = (khoaHoc: KhoaHoc): { success: boolean; message?: string } => {
  const data = getKhoaHocFromStorage();
  
  // Kiểm tra tên khóa học trùng (trừ chính nó)
  const isTenTrung = data.some(item => 
    item.tenKhoaHoc === khoaHoc.tenKhoaHoc && item.id !== khoaHoc.id
  );
  
  if (isTenTrung) {
    return { success: false, message: 'Tên khóa học đã tồn tại!' };
  }
  
  // Cập nhật khóa học
  const newData = data.map(item => 
    item.id === khoaHoc.id ? khoaHoc : item
  );
  
  saveKhoaHocToStorage(newData);
  
  return { success: true };
};

// Hàm xóa khóa học
export const xoaKhoaHoc = (id: string): { success: boolean; message?: string } => {
  const data = getKhoaHocFromStorage();
  
  // Tìm khóa học cần xóa
  const khoaHoc = data.find(item => item.id === id);
  
  if (!khoaHoc) {
    return { success: false, message: 'Không tìm thấy khóa học!' };
  }
  
  // Kiểm tra điều kiện xóa
  if (khoaHoc.soLuongHocVien > 0) {
    return { 
      success: false, 
      message: 'Không thể xóa khóa học đã có học viên!' 
    };
  }
  
  // Xóa khóa học
  const newData = data.filter(item => item.id !== id);
  saveKhoaHocToStorage(newData);
  
  return { success: true };
};

// Hàm lấy thông tin một khóa học
export const getKhoaHocById = (id: string): KhoaHoc | undefined => {
  const data = getKhoaHocFromStorage();
  return data.find(item => item.id === id);
};

// Hàm khởi tạo dữ liệu mẫu nếu chưa có
export const initKhoaHocData = () => {
  const data = getKhoaHocFromStorage();
  if (data.length === 0) {
    const sampleData: KhoaHoc[] = [
      {
        id: '1',
        tenKhoaHoc: 'Lập trình React cơ bản',
        giangVien: '1',
        moTa: 'Khóa học dành cho người mới bắt đầu với React',
        soLuongHocVien: 25,
        trangThai: 'DANG_MO',
      },
      {
        id: '2',
        tenKhoaHoc: 'JavaScript nâng cao',
        giangVien: '2',
        moTa: 'Tìm hiểu sâu về JavaScript ES6+',
        soLuongHocVien: 15,
        trangThai: 'DANG_MO',
      },
      {
        id: '3',
        tenKhoaHoc: 'Node.js và Express',
        giangVien: '3',
        moTa: 'Xây dựng API với Node.js và Express',
        soLuongHocVien: 0,
        trangThai: 'TAM_DUNG',
      },
      {
        id: '4',
        tenKhoaHoc: 'TypeScript cơ bản',
        giangVien: '4',
        moTa: 'Học TypeScript từ đầu',
        soLuongHocVien: 30,
        trangThai: 'DA_KET_THUC',
      },
      {
        id: '5',
        tenKhoaHoc: 'UX/UI Design',
        giangVien: '5',
        moTa: 'Thiết kế giao diện người dùng',
        soLuongHocVien: 20,
        trangThai: 'DANG_MO',
      },
    ];
    saveKhoaHocToStorage(sampleData);
  }
}; 