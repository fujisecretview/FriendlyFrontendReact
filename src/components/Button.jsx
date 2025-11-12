const Button = (props) => {
  // прокинуть пропсы в батон чтобы он умел меняться в зависимости от использования

  const {
    className = '',
    type = 'button',
    children,
    onClick,
  } = props

  return (
    <>
      <button
        className={`button ${className}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button