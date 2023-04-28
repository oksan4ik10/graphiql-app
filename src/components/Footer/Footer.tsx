import AnchorWithImage from '../Utils/AnchorWithImage/AnchorWithImage';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <section className={style.wrapper}>
        <article className={style.footer_dev_git}>
          <AnchorWithImage
            aHref="https://github.com/florence100"
            aText="Nastassia"
            imgSrc="./github.png"
          />
          <AnchorWithImage
            aHref="https://github.com/oksan4ik10"
            aText="Oksana"
            imgSrc="./github.png"
          />
          <AnchorWithImage
            aHref="https://github.com/olya-full"
            aText="Volha"
            imgSrc="./github.png"
          />
        </article>
        <article className={style.footer_year}>2023</article>
        <AnchorWithImage
            specialStyle="80px"
            aHref="https://github.com/oksan4ik10"
            imgSrc="./rs.svg"
          />
      </section>
    </footer>
  );
}
