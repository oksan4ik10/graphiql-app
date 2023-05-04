import style from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={style.loader__wrapper}>
      <div className={(style.loader, style.loader1)}>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
