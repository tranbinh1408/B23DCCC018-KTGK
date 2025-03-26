export namespace KhoaHoc {
  export interface IRecord {
    _id: string;
    maKhoaHoc: string;
    tenKhoaHoc: string;
    giangVien: string;
    soLuongHocVien: number;
    trangThai: ETrangThaiKhoaHoc;
    createdAt?: string;
    updatedAt?: string;
  }

  export enum ETrangThaiKhoaHoc {
    DANG_MO = 'DANG_MO',
    DA_KET_THUC = 'DA_KET_THUC',
    TAM_DUNG = 'TAM_DUNG'
  }

  export const TrangThaiKhoaHocMap = {
    [ETrangThaiKhoaHoc.DANG_MO]: {
      label: 'Đang mở',
      color: 'green'
    },
    [ETrangThaiKhoaHoc.DA_KET_THUC]: {
      label: 'Đã kết thúc', 
      color: 'red'
    },
    [ETrangThaiKhoaHoc.TAM_DUNG]: {
      label: 'Tạm dừng',
      color: 'orange'  
    }
  };
} 