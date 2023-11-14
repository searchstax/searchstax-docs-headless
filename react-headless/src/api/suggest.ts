import type { suggestResults } from '../interface/suggestResults';
import { config }  from '../config.js';

export const suggest = async (
  search: string,
  language: string = ''
): Promise<suggestResults> => {
  const url = new URL(config.suggesterURL);
  url.searchParams.append('q', search);
  language !== '' && url.searchParams.append('language', language);
  return await fetch(url.href, {
    method: 'get',
    headers: {
      Authorization: `Token ${config.searchAuth}`
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('error')
      }
      return await response.json();
    })
    .catch((error: Error) => {
      throw error
    });
}
