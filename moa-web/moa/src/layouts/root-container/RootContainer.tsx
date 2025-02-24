/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from './style'

interface RootContainerProps {
  children : React.ReactNode;
}

export default function RootContainer({ children }: RootContainerProps ) {
  return (
    <div css={s.mainContainer}>
      {children}
    </div>
  )
}
