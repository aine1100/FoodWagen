// Mock Next.js Image component for tests
import React from 'react'

const NextImageMock = ({ src, alt, ...props }: any) => {
  return <img src={typeof src === 'string' ? src : src?.src || ''} alt={alt} {...props} />
}

export default NextImageMock
