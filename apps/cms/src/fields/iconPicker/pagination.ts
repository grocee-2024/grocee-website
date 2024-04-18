type PaginationOptions = {
  /**
   * Current page
   */
  page: number
  /**
   * Maximum number of items to display
   */
  maxItemsPerPage: number
}

export const getPagination = <T>(data: T[], options: PaginationOptions) => {
  const { page, maxItemsPerPage } = options

  const totalPages = Math.ceil(data.length / maxItemsPerPage)

  const sliceStartIndex = maxItemsPerPage * (page - 1)
  const dataToShow = data.slice(sliceStartIndex, sliceStartIndex + maxItemsPerPage)

  const pagination: number[] = []

  if (totalPages <= 1) {
    return {
      dataToShow,
      pagination: [1],
      totalPages,
    }
  }

  const iterationStartIndex =
    page === 1 ? 1 : page === totalPages && page !== 2 ? totalPages - 2 : page - 1
  const iterationEndIndex = Math.min(iterationStartIndex + 2, totalPages)

  for (let index = iterationStartIndex; index <= iterationEndIndex; index++) {
    pagination.push(index)
  }

  return {
    dataToShow,
    pagination,
    totalPages,
  }
}
