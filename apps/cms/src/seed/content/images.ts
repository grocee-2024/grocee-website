import path from 'path'
import payload from 'payload'

export const createSingleImage = async (filePath: string, alt: string) => {
  const image = await payload.create({
    collection: 'images',
    data: {
      alt,
    },
    filePath,
  })

  payload.logger.info(`> Created image ${filePath}`)

  return image
}

export const createImages = async () => {
  const logo = await createSingleImage(path.resolve(__dirname, '../media/logo.svg'), 'Grocee')

  const mainGoods = await createSingleImage(
    path.resolve(__dirname, '../media/main-goods.png'),
    'Main Goods',
  )

  const tempImage = await createSingleImage(
    path.resolve(__dirname, '../media/temp-image.png'),
    'Temp Image',
  )

  return {
    logoId: logo.id,
    mainGoodsId: mainGoods.id,
    tempImageId: tempImage.id,
  }
}

export type Images = Awaited<ReturnType<typeof createImages>>
