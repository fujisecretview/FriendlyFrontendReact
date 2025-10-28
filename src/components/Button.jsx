const Button = (props) => {
  // прокинуть пропсы в батон чтобы он умел меняться в зависимости от использования

  const {
    className = '',
    type = 'button',
    children,
  } = props

  return (
    <>
      <button
        className={`button ${className}`}
        type={type}
      >
        {children}
      </button>
    </>
  )
}

export default Button