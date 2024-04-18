import { mapIcon } from '@oleksii-lavka/grocee-icons'
import { Button } from 'payload/components'
import React, { useMemo } from 'react'

type WithCancelButtonProps = {
  withCancelButton?: true
  onCancel: () => void
}

type WithoutCancelButtonProps = {
  withCancelButton?: false
}

type IconPreviewProps = {
  icon: string
  iconSize: number
} & (WithCancelButtonProps | WithoutCancelButtonProps)

export default function IconPreview({ icon, iconSize, ...props }: IconPreviewProps) {
  const Icon = useMemo(() => mapIcon(icon), [icon])

  return (
    <div className='preview-wrapper'>
      {Icon && <Icon size={iconSize} />}

      {props.withCancelButton && (
        <Button
          size='medium'
          iconPosition='left'
          iconStyle='with-border'
          buttonStyle='icon-label'
          className='preview-cancel-button'
          onClick={props.onCancel}
          tooltip='Cancel'
          icon='x'
        />
      )}
    </div>
  )
}
