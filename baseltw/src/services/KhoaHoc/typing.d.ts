export interface KhoaHoc {
  id: string;
  tenKhoaHoc: string;
  giangVien: string;
  moTa: string;
  soLuongHocVien: number;
  trangThai: 'DANG_MO' | 'DA_KET_THUC' | 'TAM_DUNG';
}

export interface GiangVien {
  id: string;
  ten: string;
}

export interface KhoaHocParams {
  keyword?: string;
  giangVien?: string;
  trangThai?: string;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
} 