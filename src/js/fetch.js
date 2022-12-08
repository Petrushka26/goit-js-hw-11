import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31873766-d0cfa485484b875bfbae9a585',
    per_page: 40,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

export async function fetchPictures(q, page) {
  const { data } = await instance.get('/', { params: { q, page } });
  return data;
}
