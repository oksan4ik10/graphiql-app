import styles from './AnchorWithImage.module.css';

interface IAnchorWithImageProps {
  aHref: string;
  aText?: string;
  imgSrc: string;
  imgAlt?: string;
  specialStyle?: string;
}

export default function AnchorWithImage({
  aHref,
  aText,
  imgSrc,
  imgAlt,
  specialStyle,
}: IAnchorWithImageProps) {
  const specialWidth = specialStyle
    ? {
        width: specialStyle,
      }
    : {};

  return (
    <div className={styles.anchor_with_image_wrapper}>
      <a href={aHref}>
        {aText && <div className={styles.anchor_with_image_text}>{aText}</div>}
        <img
          style={specialWidth}
          className={styles.anchor_with_image_image}
          src={imgSrc}
          alt={imgAlt ? imgAlt : 'image'}
        ></img>
      </a>
    </div>
  );
}
