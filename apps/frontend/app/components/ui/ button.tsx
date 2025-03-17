import React, { ReactNode } from 'react'

type buttonprops = {
    variant?: variantType
    text: string
    size?: sizeType
    starticon?: ReactNode
    endicon?: ReactNode
}

type variantType = "primary" | "secondary"
type sizeType = "small" | "medium" | "large"

const defaultvariant = "headfont-medium bg-defaultgreen rounded-lg";

export default function  Button({props}:{props:buttonprops}) {
  return (
    <button>

    </button>
  )
}
