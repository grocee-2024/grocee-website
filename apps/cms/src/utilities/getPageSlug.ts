export const getPageSlug = (slug: string) => {
  switch (slug) {
    case 'home':
      return ''

    case 'category':
      return 'category/{{category}}'

    default:
      return slug
  }
}
