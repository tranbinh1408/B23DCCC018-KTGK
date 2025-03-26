import { KhoaHoc } from './typing';

const STORAGE_KEY = 'KHOA_HOC_DATA';

export const KhoaHocService = {
  getAll: (): KhoaHoc.IRecord[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  create: (khoaHoc: Omit<KhoaHoc.IRecord, 'id' | 'createdAt'>) => {
    const data = KhoaHocService.getAll();
    const newKhoaHoc: KhoaHoc.IRecord = {
      ...khoaHoc,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    
    data.push(newKhoaHoc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newKhoaHoc;
  },

  update: (id: string, khoaHoc: Partial<KhoaHoc.IRecord>) => {
    const data = KhoaHocService.getAll();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...khoaHoc };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data[index];
    }
    return null;
  },

  delete: (id: string) => {
    const data = KhoaHocService.getAll();
    const filtered = data.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};