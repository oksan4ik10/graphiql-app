import { useTranslation } from 'react-i18next';

import styles from './WelcomePage.module.css';
import AnchorWithImage from '../../components/Utils/AnchorWithImage/AnchorWithImage';

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>{t('welcome title')}</h1>
          <div className={styles.welcome_outer}>
            <div className={styles.welcome_wrap}>
              <section className={styles.welcome_section}>
                <h3 className={styles.subheader}>{t('devs')}</h3>
                <article className={styles.welcome_git}>
                  <div className={styles.git_wrap}>
                    <div className={styles.git_link}>
                      <AnchorWithImage
                        aHref="https://github.com/florence100"
                        aText={t('Nastya')}
                        imgSrc="./github.png"
                      />{' '}
                    </div>
                    <div className={styles.git_desc}>{t('Nastya info')}</div>
                  </div>
                  <div className={`${styles.git_wrap} ${styles.git_alternate}`}>
                    <div className={styles.git_link}>
                      <AnchorWithImage
                        aHref="https://github.com/oksan4ik10"
                        aText={t('Oksana')}
                        imgSrc="./github.png"
                      />{' '}
                    </div>
                    <div className={styles.git_desc}>{t('Oksana info')}</div>
                  </div>
                  <div className={styles.git_wrap}>
                    <div className={styles.git_link}>
                      <AnchorWithImage
                        aHref="https://github.com/olya-full"
                        aText={t('Olya')}
                        imgSrc="./github.png"
                      />{' '}
                    </div>
                    <div className={styles.git_desc}>{t('Olya info')}</div>
                  </div>
                </article>
              </section>
              <section className={styles.welcome_section}>
                <h3 className={styles.subheader}>{t('info')}</h3>
                <div className={styles.sub}>{t('info sub')}</div>
              </section>
              <section className={styles.welcome_section}>
                <h3 className={styles.subheader}>{t('course')}</h3>
                <div className={styles.sub}>
                  {t('course sub')}
                  <a href="https://rs.school/react/">{t('link')}</a>
                </div>
              </section>
            </div>
            <div className={styles.welcome_pic_wrap}>
              <div className={styles.img}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
