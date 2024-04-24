import { Props } from 'payload/components/fields/Text'
import { Label, useFieldType } from 'payload/components/forms'
import React from 'react'

import IconPreview from './IconPreview'
import PickIconForm from './PickIconForm'
import './iconPickerStyles.css'

export default function IconPicker({ path, label, required }: Props) {
  const { value = '', setValue } = useFieldType({ path: path ?? '' })

  return (
    <div className='section-wrapper'>
      <Label htmlFor={path} label={label} required={required} />

      {Boolean(value) ? (
        <IconPreview
          icon={value as string}
          iconSize={80}
          withCancelButton
          onCancel={() => setValue('')}
        />
      ) : (
        <PickIconForm path={path ?? ''} onPick={setValue} />
      )}
    </div>
  )
}
