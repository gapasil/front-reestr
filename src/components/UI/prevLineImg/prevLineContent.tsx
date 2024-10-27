import React, { useState } from 'react';
import Image from 'next/image';
import styles from './prevLineContent.module.scss';

interface Item {
  src: string;
  type: 'image' | 'video'; // Литеральные строки для типов
}

interface PrevLineContentProps {
  items: Item[];
}

const PrevLineContent: React.FC<PrevLineContentProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleOpen = (item: Item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentItem(null);
  };

  return (
    <div>
      <div className={styles.gallery}>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleOpen(item)}
            className={styles.thumbnail}
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className={styles.thumbnailImage}
                style={{ objectFit: 'cover' }} // Убедитесь, что изображения обрезаются правильно
              />
            ) : (
              <div className={styles.thumbnailVideo}>
                <video
                  className={styles.videoElement}
                  src={item.src}
                  muted
                  width={100}
                  height={100}
                  loop
                />
                <div className={styles.playButton} />{' '}
                {/* Кнопка воспроизведения */}
              </div>
            )}
          </div>
        ))}
      </div>

      {isOpen && currentItem && (
        <div className={styles.fullscreenOverlay} onClick={handleClose}>
          <div
            className={styles.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === 'image' ? (
              <Image
                src={currentItem.src}
                alt="Full Screen Image"
                layout="fill" // Используем layout="fill"
                objectFit="contain" // Убедитесь, что изображение будет масштабироваться
                className={styles.fullscreenImage}
              />
            ) : (
              <video
                className={styles.fullscreenVideo}
                src={currentItem.src}
                controls
                style={{ width: '100%', height: 'auto' }} // Задайте ширину и высоту видео
              />
            )}
            <button className={styles.closeButton} onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrevLineContent;
