import style from './MainPage.module.css';
import Editor from '../../components/Editor/Editor';

export default function MainPage() {
  return (
    <div className={style.main__container}>
      <h2>Документация</h2>
      <Editor></Editor>
      <h2>Ответ сервера</h2>
    </div>
  );
}
