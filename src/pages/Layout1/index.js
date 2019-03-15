import React from 'react';
import classnames from 'classnames';

import data from './data';
import css from './styles.module.css';

const imageURL = 'https://i.pinimg.com/originals/ac/d7/92/acd7926f53a7a9e93bb15bf46d3831fb.jpg';

export default function() {
  return (
    <div className={classnames(css.wrapper)}>
      <div className={classnames(css.box, css.a)}>A</div>
      <div className={classnames(css.box, css.b)}>B</div>
      <div className={classnames(css.box, css.hero)}>
        <div className={css.heroSection}>
          <div className={css.heroImage} style={{ backgroundImage: `linear-gradient(to top right, rgba(33,33,33, 0.6), rgba(0, 0, 0, 0.8)), url(${imageURL})` }} />
        </div>
      </div>
      <div className={classnames(css.box, css.d)}>{data.text}</div>
      <div className={classnames(css.box, css.e)}>E</div>
    </div>
  );
}
