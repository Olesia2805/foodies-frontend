import css from './MainTitle.module.css';

const MainTitle = ({ title }) => {
  return <h2 className={css.mainTitle}>{title}</h2>;
};

export default MainTitle;