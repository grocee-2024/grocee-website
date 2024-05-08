import { SetupEdgeBlocksOnPage } from '@/components/SetupEdgeBlocksOnPage'

export default async function Cart() {
  return (
    <>
      <SetupEdgeBlocksOnPage layout={[]} />
      <div className='mb-20 flex flex-col gap-16 laptop:gap-20 [&>*:nth-child(2)]:-mt-8 laptop:[&>*:nth-child(2)]:-mt-2'>
        Cart
      </div>
    </>
  )
}
