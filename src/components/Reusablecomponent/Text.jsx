
const Text = ({data,headingclass,textclass,classname}) => {



  return (
    <div className={classname}>
      <h2  className={headingclass}>{data[0]?.midSection[0]} </h2>
      <h2 className={textclass}>{data[0]?.midSection[1]}</h2>
    </div>
  )
}

export default Text
