import { ReactNode } from 'react';

import styles from './Modal.module.css';

interface IModalProps {
  children: ReactNode;
  modalFunc?: () => void;
}

export const Modal = ({ children, modalFunc }: IModalProps) => {
  const handleClick = () => {
    modalFunc && modalFunc();
  };

  return (
    <div onClick={handleClick} className={styles.modal_outer_container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal_inner_container}>
        <div className={styles.modal_cross_container}>
          <div className={styles.modal_cross_wrap}>
            <img onClick={handleClick} className={styles.modal_cross_img} src="./cross.png" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
