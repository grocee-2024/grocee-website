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
  const logoDark = await createSingleImage(
    path.resolve(__dirname, '../media/logo-dark.svg'),
    'Grocee',
  )
  const logoLight = await createSingleImage(
    path.resolve(__dirname, '../media/logo-light.svg'),
    'Grocee',
  )

  const mainGoods = await createSingleImage(
    path.resolve(__dirname, '../media/main-goods.png'),
    'Main Goods',
  )

  const tempImage = await createSingleImage(
    path.resolve(__dirname, '../media/temp-image.png'),
    'Temp Image',
  )

  const actionsCategory = await createSingleImage(
    path.resolve(__dirname, '../media/actions.png'),
    'Actions',
  )

  const noveltyCategory = await createSingleImage(
    path.resolve(__dirname, '../media/novelty.png'),
    'Novelty',
  )

  const cookedFoodCategory = await createSingleImage(
    path.resolve(__dirname, '../media/cooked-food.png'),
    'Cooked Food',
  )

  const hitsCategory = await createSingleImage(path.resolve(__dirname, '../media/hits.png'), 'Hits')

  const logoIpsumLogo1 = await createSingleImage(
    path.resolve(__dirname, '../media/logo-ipsum-1.svg'),
    'LogoIpsum1',
  )

  const logoIpsumLogo2 = await createSingleImage(
    path.resolve(__dirname, '../media/logo-ipsum-2.svg'),
    'LogoIpsum2',
  )

  const logoIpsumLogo3 = await createSingleImage(
    path.resolve(__dirname, '../media/logo-ipsum-3.svg'),
    'LogoIpsum3',
  )

  const logoIpsumLogo4 = await createSingleImage(
    path.resolve(__dirname, '../media/logo-ipsum-4.svg'),
    'LogoIpsum4',
  )

  const cookAndEatLogo = await createSingleImage(
    path.resolve(__dirname, '../media/cook&eat-logo.svg'),
    'Cook&Eat',
  )

  const marketBanner = await createSingleImage(
    path.resolve(__dirname, '../media/market-banner.png'),
    'Market Banner',
  )

  const deliveryBanner = await createSingleImage(
    path.resolve(__dirname, '../media/delivery-banner.png'),
    'Delivery Banner',
  )

  const potato = await createSingleImage(
    path.resolve(__dirname, '../media/potato-card.png'),
    'Potato',
  )

  const apple = await createSingleImage(path.resolve(__dirname, '../media/apple-card.png'), 'Apple')

  const bread = await createSingleImage(path.resolve(__dirname, '../media/bread-card.png'), 'Bread')

  const milk = await createSingleImage(path.resolve(__dirname, '../media/milk-card.png'), 'milk')

  return {
    logoDarkId: logoDark.id,
    logoLightId: logoLight.id,
    mainGoodsId: mainGoods.id,
    tempImageId: tempImage.id,
    actionsCategoryId: actionsCategory.id,
    noveltyCategoryId: noveltyCategory.id,
    cookedFoodCategoryId: cookedFoodCategory.id,
    hitsCategoryId: hitsCategory.id,
    logoIpsumLogo1Id: logoIpsumLogo1.id,
    logoIpsumLogo2Id: logoIpsumLogo2.id,
    logoIpsumLogo3Id: logoIpsumLogo3.id,
    logoIpsumLogo4Id: logoIpsumLogo4.id,
    cookAndEatLogoId: cookAndEatLogo.id,
    marketBannerId: marketBanner.id,
    deliveryBannerId: deliveryBanner.id,
    potatoId: potato.id,
    appleId: apple.id,
    breadId: bread.id,
    milkId: milk.id,
  }
}

export type Images = Awaited<ReturnType<typeof createImages>>
