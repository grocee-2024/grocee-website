import { getCollectionItem } from '@/cms'
import { pageToUrl, resolveRelation } from '@/cms/helpers'
import { News, NewsCardBlock } from 'cms-types'

export const mapCMSNewsCards = async (newsCards: NewsCardBlock[]) => {
  const mappedNewsCards = await Promise.all(
    (newsCards ?? []).map(async newsCard => {
      const newsArticle = resolveRelation(newsCard.newsArticle) as News

      let previewImage = newsArticle.previewImage

      if (typeof previewImage === 'string') {
        previewImage = await getCollectionItem(previewImage, 'images')
      }

      const { id, title, titleColor } = newsArticle

      const pageUrl = pageToUrl(newsCard.newsArticle) as string

      return {
        id: id as string,
        title,
        previewImage,
        pageUrl,
        titleColor,
      }
    }),
  )

  return mappedNewsCards
}
