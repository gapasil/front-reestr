import React, { FC } from 'react';
import styles from './roundToggle.module.scss';

interface RoundToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const RoundToggle: FC<RoundToggleProps> = ({ value, onChange }) => {
  return (
    <div
      className={`${styles.toggle} ${value ? styles.active : ''}`}
      onClick={() => onChange(!value)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onChange(!value);
        }
      }}
    >
      <div className={styles.knob} />
    </div>
  );
};

export default RoundToggle;
