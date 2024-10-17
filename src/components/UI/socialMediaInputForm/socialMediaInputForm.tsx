import React, { FC } from 'react';
import styles from './socialMediaInput.module.scss';

interface SocialMediaInputProps {
  platform: 'facebook' | 'instagram';
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaInput: FC<SocialMediaInputProps> = ({
  platform,
  value,
  onChange,
}) => (
  <div className={styles.container}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
    />
  </div>
);

export default SocialMediaInput;
