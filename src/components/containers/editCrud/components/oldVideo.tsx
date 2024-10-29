import React, { FC, memo } from 'react';
import styles from './oldVideo.module.scss';
import { API } from '@/variable/Api';

interface OldVideoProps {
  videoUrl: string; // URL видео
  onRemove: () => void; // Функция для удаления видео
}

const OldVideo: FC<OldVideoProps> = memo(({ videoUrl, onRemove }) => {
  return (
    <div className={styles.videoWrapper}>
      <video width={250} height={250} controls>
        <source src={`${API}${videoUrl}`} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <button
        type="button"
        onClick={onRemove} // Вызов функции удаления при нажатии
        className={styles.removeButton}
      >
        Удалить
      </button>
    </div>
  );
});

OldVideo.displayName = 'OldVideo';

export default OldVideo;
