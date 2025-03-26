import { KhoaHoc } from './typing';

const STORAGE_KEY = 'KHOA_HOC_DATA';

export const KhoaHocService = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  create(khoaHoc: Omit<KhoaHoc.IRecord, '_id' | 'createdAt'>) {
    const data = this.getAll();
    const newKhoaHoc: KhoaHoc.IRecord = {
      ...khoaHoc,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    
    data.push(newKhoaHoc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newKhoaHoc;
  },

  update(_id: string, khoaHoc: Partial<KhoaHoc.IRecord>) {
    const data = this.getAll();
    const index = data.findIndex(item => item._id === _id);
    if (index !== -1) {
      data[index] = { ...data[index], ...khoaHoc };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data[index];
    }
    return null;
  },

  delete(_id: string) {
    const data = this.getAll();
    const filtered = data.filter(item => item._id !== _id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};