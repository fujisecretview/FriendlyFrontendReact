import styles from './Button.module.scss'

const Button = (props) => {
  // прокинуть пропсы в батон чтобы он умел меняться в зависимости от использования

  const {
    className = '',
    type = 'button',
    children,
    onClick,
    isDisabled,
  } = props

  return (
    <>
      <button
        className={`${styles.button} ${className}`}
        disabled={isDisabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button