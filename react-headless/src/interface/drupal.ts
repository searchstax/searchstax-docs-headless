
export interface menuLink {
  type: string,
  id: string,
  attributes: {
    drupal_internal__id: number,
    langcode: string,
    enabled: boolean,
    title?: string,
    description?: string,
    menu_name: string,
    link: {
      uri: string,
      title: string,
    },
    weight: number,
    parent: string,
  }
}

export interface article {
  data: {
    type: string,
    id: string,
    attributes: {
      drupal_internal__id: number,
      langcode: string,
      title?: string,
      path: {
        alias: string,
        pid: number,
      },
      body: {
        value: string,
        format: string,
        processed: string,
        summary: string,
      }
    },
  } [],
}

export interface urlAlias {
  type: string,
  id: string,
  attributes: {
    drupal_internal__id: number,
    langcode: string,
    path: string,
    alias: string,

  },
}
