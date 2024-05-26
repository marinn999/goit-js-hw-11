export function searchImage(query) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: '44039917-a1e08adf8a4d452f4e6ec8aba',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${params}`;
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-hidden');
  loader.textContent = 'Loading images, please wait...';

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
