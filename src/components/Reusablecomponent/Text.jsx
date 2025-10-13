import React from 'react'

const Text = ({heading,headingclass,text,textclass,classname}) => {
     

  return (
    <div className={classname}>
      <h2 className={headingclass}>{heading}</h2>
      <h2 className={textclass}>{text}</h2>
    </div>
  )
}

export default Text
