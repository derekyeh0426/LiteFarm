import { Title } from '../../Typography';
import React from 'react';
import styles from './styles.module.scss';
import { BsChevronLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { CancelButton } from '../CancelButton';

function PageTitle({ title, onGoBack, onCancel, style, cancelModalTitle }) {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.leftContainer}>
        {onGoBack && (
          <button type={'button'} className={styles.buttonContainer} onClick={onGoBack}>
            <BsChevronLeft style={{ fontSize: '20px' }} />
          </button>
        )}
        <Title style={{ marginBottom: 0 }}>{title}</Title>
      </div>
      {!!onCancel && <CancelButton onClick={onCancel} cancelModalTitle={cancelModalTitle} />}
    </div>
  );
}

export default PageTitle;
PageTitle.prototype = {
  title: PropTypes.string,
  onGoBack: PropTypes.func,
  onCancel: PropTypes.func,
  style: PropTypes.object,
};
