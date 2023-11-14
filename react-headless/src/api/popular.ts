import type { popularResults } from '../interface/popularResults';
import { config }  from '../config.js';

export const popular = async (
  language: string = ''
): Promise<popularResults> => {
  const url = new URL(config.popularURL);
  language !== '' && url.searchParams.append('language', language);
  return await fetch(url.href, {
    method: 'get',
    headers: {
      Authorization: config.relatedSearchesAPIKey
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
