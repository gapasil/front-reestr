import React, { FC, memo } from 'react';
import styles from './oldImage.module.scss';
import Image from 'next/image';
import { API } from '@/variable/Api';

interface OldImageProps {
  imageUrl: string;
  onRemove: () => void;
}

const OldImage: FC<OldImageProps> = memo(({ imageUrl, onRemove }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={`${API}${imageUrl}`}
        alt="Old Image"
        width={250}
        height={250}
        quality={100}
        className={styles.image}
        style={{ objectFit: 'cover' }}
      />
      <button type="button" onClick={onRemove} className={styles.removeButton}>
        Удалить
      </button>
    </div>
  );
});

OldImage.displayName = 'OldImage';

export default OldImage;
