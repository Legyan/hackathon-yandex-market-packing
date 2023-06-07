import { FC } from 'react';
import style from './Progressbar.module.css'

const Progressbar: FC = () => {
  const steps = ['Получение заказа', 'Упаковка товара', 'Заказ собран'];

  return (
    <article className={style.wrapper}>
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
    </article>
  )
}

export default Progressbar;
