const API = '/asip-api';

export function requestVideoSources() {
  const url = `${API}/video-sources/`;
  const method = 'GET';

  return fetch(url, { method }).then(r => r.json());
}