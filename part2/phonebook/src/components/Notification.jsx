
function Notification({ type, message }) {
  return (
    <div className={ `${type}${!message ? ' hide' : ''}` }>
      { message }
    </div>
  )
}

export default Notification