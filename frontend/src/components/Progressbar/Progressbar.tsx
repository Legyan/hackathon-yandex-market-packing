import { FC } from 'react';
import style from './Progressbar.module.css'
import { steps } from '../../utils/constants';
import { IProgressbar } from '../../utils/type/main';

const Progressbar: FC<IProgressbar> = ({ title }) => {
  return (
    <article className={title ? `${style.wrapper} ${style.mw}` : `${style.wrapper}`}>
      {title ?
        <h2 className={style.title}>{title}</h2> : ''
      }
      <div className={title ? `${style.wrapperStep} ${style.mws}` : `${style.wrapperStep}`}>
      {steps?.map((step, i) => {
        return (
          <div className={style.steps} key={i}>
            <p className={style.step}>{step}</p>
            <span className={style.circleWhite}>
              <span className={style.circleYellow}>
                <span className={style.counter}>{i + 1}</span>
              </span>
            </span>
          </div>
        )
      })}
      </div>

    </article>
  )
}

export default Progressbar;
