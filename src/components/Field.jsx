const Field = (props) => {

  const {
    className = '',
    id,
    label,
    type = 'text',
    value,
    onInput,
    ref,
  } = props

  // все эти пропсы будут менять атрибуты чтобы переиспользовать компонент
  // в зависимости от нужд и ситуации


  return (
    <>
      <div className={`field ${className}`}>
        <label
          className="field__label"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="field__input"
          id={id}
          placeholder=" "
          autoComplete="off"
          ref={ref}
          type={type}
          value={value}
          onInput={onInput}
        />
      </div>
    </>
  )
}

export default Field