import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import iconPicker from './iconPicker'

export const appearanceOptions = {
  primary: {
    label: 'Primary Button',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary Button',
    value: 'secondary',
  },
  tertiary: {
    label: 'Tertiary Button',
    value: 'tertiary',
  },
  danger: {
    label: 'Danger Button',
    value: 'danger',
  },
  default: {
    label: 'Default Link',
    value: 'defaultLink',
  },
}

export type LinkAppearances = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'defaultLink'

type LinkType = (options?: {
  name?: string
  label?: string
  appearances?: LinkAppearances[] | false
  overrides?: Record<string, unknown>
}) => Field

const linkOrButton: LinkType = ({
  name = 'linkOrButton',
  label = 'Link Or Button',
  appearances,
  overrides = {},
} = {}) => {
  let appearanceOptionsToUse = [
    appearanceOptions.default,
    appearanceOptions.primary,
    appearanceOptions.secondary,
    appearanceOptions.tertiary,
    appearanceOptions.danger,
  ]

  if (appearances) {
    appearanceOptionsToUse = appearances.map(appearance => appearanceOptions[appearance])
  }

  const linkResult: Field = {
    name,
    label,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
            localized: true,
            admin: {
              width: '30%',
            },
          },
          {
            name: 'type',
            type: 'select',
            options: [
              { label: 'Link', value: 'link' },
              { label: 'Button', value: 'button' },
            ],
            defaultValue: 'button',
            admin: {
              width: '30%',
            },
          },
          {
            name: 'appearance',
            type: 'select',
            defaultValue: 'defaultLink',
            options: appearanceOptionsToUse,
            admin: {
              description: 'Choose how the button (or link) should be rendered.',
              width: '30%',
            },
          },
        ],
      },
      {
        name: 'isStandartButton',
        type: 'checkbox',
        admin: {
          condition: (_, siblingData) => siblingData?.appearance !== 'defaultLink',
        },
      },
      {
        name: 'linkType',
        type: 'radio',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
        ],
        defaultValue: 'reference',
        admin: {
          layout: 'horizontal',
          width: '45%',
          condition: (_, siblingData) => Boolean(siblingData?.type === 'link'),
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'reference',
            label: 'Document to link to',
            type: 'relationship',
            relationTo: ['pages', 'categories', 'news', 'productPages', 'newsPages'],
            required: true,
            maxDepth: 1,
            admin: {
              condition: (_, siblingData) =>
                siblingData?.linkType === 'reference' && siblingData?.type === 'link',
              width: '40%',
            },
          },
          {
            name: 'url',
            label: 'Custom URL',
            type: 'text',
            required: true,
            admin: {
              condition: (_, siblingData) =>
                siblingData?.linkType === 'custom' && siblingData?.type === 'link',
              width: '40%',
            },
          },
          {
            name: 'newTab',
            label: 'Open in new tab',
            type: 'checkbox',
            admin: {
              width: '10%',
              style: {
                alignSelf: 'flex-end',
              },
              condition: (_, siblingData) => Boolean(siblingData?.type === 'link'),
            },
          },
        ],
      },
      {
        name: 'icons',
        type: 'group',
        fields: [
          {
            type: 'tabs',
            tabs: [
              {
                name: 'leftIcon',
                fields: [iconPicker],
              },
              {
                name: 'rightIcon',
                fields: [iconPicker],
              },
            ],
          },
        ],
        admin: {
          condition: (_, siblingData) => siblingData?.appearance !== 'defaultLink',
        },
      },
    ],
  }

  return deepMerge(linkResult, overrides)
}

export default linkOrButton
