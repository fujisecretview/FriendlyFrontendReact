import styles from './field.module.scss';

const Field = (props) => {

  const {
    className = '',
    id,
    label,
    type = 'text',
    value,
    error,
    onInput,
    ref,
  } = props

  // все эти пропсы будут менять атрибуты чтобы переиспользовать компонент
  // в зависимости от нужд и ситуации


  return (
    <>
      <div className={`${styles.field} ${className}`}>
        <label
          className={`${styles.label}`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={`${styles.input} ${error ? `${styles.error}` : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          ref={ref}
          type={type}
          value={value}
          onInput={onInput}
        />
        {error && (
          <span className={`${styles.error}`}>{error}</span>
        )}
      </div>
    </>
  )
}

export default Field