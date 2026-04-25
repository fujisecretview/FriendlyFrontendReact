import { BASE_URL } from '@/shared/constants';

const RouterLink = (props) => {
  const { to, children, ...rest } = props;

  // При нажатии на ссылку
  // - мы отменяем дефолтное поведение браузера
  // - добпаляем в адрессную строку ссылку
  // - генерируем popstate ручками чтобы роутер понял что нужно сработать

  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={`${BASE_URL}:${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;
