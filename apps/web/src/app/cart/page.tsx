import { SetupEdgeBlocksOnPageStore } from '@/components/SetupEdgeBlocksOnPageStore'

export default async function Cart() {
  return (
    <>
      <SetupEdgeBlocksOnPageStore />
      <div className='mb-20 flex flex-col gap-16 laptop:gap-20 [&>*:nth-child(2)]:-mt-8 laptop:[&>*:nth-child(2)]:-mt-2'>
        Cart
      </div>
    </>
  )
}
