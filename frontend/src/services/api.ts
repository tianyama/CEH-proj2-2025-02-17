import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    return [];
  }
};

export const addContainer = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi thêm container:', error);
  }
};

export const updateContainer = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi cập nhật container:', error);
  }
};

export const deleteContainer = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Lỗi xóa container:', error);
  }
};
