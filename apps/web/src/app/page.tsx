'use client'

import { AccordionList, Card, Input, MainSlider } from 'ui'

export default function Home() {
  return (
    <div className='px-2.5'>
      <MainSlider
        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
        loop
        virtual
        allowTouchMove={true}
        breakpoints={{
          1024: {
            allowTouchMove: false,
          },
        }}
        slideClassName='flex text-gray-25'
        slides={[
          {
            image: '',
            heading: {
              title: 'Quick & Convenient: Order Groceries Online',
              description:
                'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
              button: {
                children: <span className='flex grow justify-start'>Order delivery</span>,
                props: {
                  standartButton: true,
                  href: '/',
                  rightIcon: {
                    icon: 'ArrowCircleRight',
                    size: 18,
                  },
                },
              },
            },
          },
          {
            image: '',
            heading: {
              title: 'Quick & Convenient: Order Groceries Online',
              description:
                'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
              button: {
                children: <span className='flex grow justify-start'>Order delivery2</span>,
                props: {
                  standartButton: true,
                  href: '/',
                  rightIcon: {
                    icon: 'ArrowCircleRight',
                    size: 18,
                  },
                },
              },
            },
          },
          {
            image: '',
            heading: {
              title: 'Quick & Convenient: Order Groceries Online',
              description:
                'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
              button: {
                children: <span className='flex grow justify-start'>Order delivery2</span>,
                props: {
                  standartButton: true,
                  href: '/',
                  rightIcon: {
                    icon: 'ArrowCircleRight',
                    size: 18,
                  },
                },
              },
            },
          },
          {
            image: '',
            heading: {
              title: 'Quick & Convenient: Order Groceries Online',
              description:
                'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
              button: {
                children: <span className='flex grow justify-start'>Order delivery2</span>,
                props: {
                  standartButton: true,
                  href: '/',
                  rightIcon: {
                    icon: 'ArrowCircleRight',
                    size: 18,
                  },
                },
              },
            },
          },
        ]}
        spaceBetween={50}
        slidesPerView={1}
        slidesPerGroup={1}
      />
    </div>
  )
}
