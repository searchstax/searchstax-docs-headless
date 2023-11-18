import type { article, menuLink, urlAlias } from '../interface/drupal';
/*
fetchNavMenu is used to populate the sitewide navigation menu
menu_link_content endpoint requires 'Administer menus and menu links' permission for anonymous users
*/

export const fetchNavMenu = async (
): Promise<menuLink[]> => {
  let url = new URL(`${import.meta.env.VITE_DRUPAL_API ?? ''}/jsonapi/menu_link_content/menu_link_content`);
  let data = <menuLink[]>[]
  let getPage = true;

  while (getPage) {
    const response = await fetch(url.href, {
      method: 'get',
    })
    .then(async (response) => {
      if (!response.ok) {
        return response.text().then((message) => { throw new Error(message) })
      }
      return await response.json();
    })
    .catch((error: Error) => {
      throw error
    });
    data = [...data, ...response.data];
    if (response.links.next) {
      url = new URL(response.links.next.href);
    }
    else {
      getPage = false;
      break;
    }
  }
  return data;
}

/*
fetchArticleFromID is used to load a page after looking up the node ID from path_alias
*/

export const fetchArticleFromID = async (
  nodeID: string
): Promise<article> => {
  const url = new URL(`${import.meta.env.VITE_DRUPAL_API ?? ''}/jsonapi/node/article?filter%5Bnid%5D=${nodeID}`);
  return await fetch(url.href, {
    method: 'get',
  })
    .then(async (response) => {
      if (!response.ok) {
        return response.text().then((message) => { throw new Error(message) })
      }
      return await response.json();
    })
    .catch((error: Error) => {
      throw error
    });
}

/*
fetchAliases is used to match URL paths to the node IDs in order to fetch a requested page
Any links included on a Drupal page will be intercepted if they match a URL in path_alias
path_alias endpoint requires 'Administer URL aliases' permission for anonymous users
*/

export const fetchAliases = async (
): Promise<urlAlias[]> => {
  let url = new URL(`${import.meta.env.VITE_DRUPAL_API ?? ''}/jsonapi/path_alias/path_alias/`);
  let data = <urlAlias[]>([])
  let getPage = true;

  while (getPage) {
    const response = await fetch(url.href, {
      method: 'get',
    })
    .then(async (response) => {
      if (!response.ok) {
        return response.text().then((message) => { throw new Error(message) })
      }
      return await response.json();
    })
    .catch((error: Error) => {
      throw error
    });
    data = [...data, ...response.data];
    if (response.links.next) {
      url = new URL(response.links.next.href);
    }
    else {
      getPage = false;
      break;
    }
  }
  return data;
}
