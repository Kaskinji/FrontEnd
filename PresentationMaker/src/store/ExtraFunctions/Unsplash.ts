import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '2np_rUgkMeyrosoBfI-6WCshtB5SrcIDD6maOAURaRA',
});

export const searchImages = async (query: string) => {
  try {
    const response = await unsplash.search.getPhotos({ query });
    return response.response?.results || [];
  } catch (error) {
    console.error('Error fetching images from Unsplash', error);
    return [];
  }
};