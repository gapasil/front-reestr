import React, { FC, useEffect, useState } from 'react';
import styles from './videoUpload.module.scss';

interface VideoUploadProps {
  label: string;
  onVideoChange: (files: File[] | null) => void; // Function to pass the selected video files
  setPrev: boolean; // Prop to reset previews
  lengthOldVideo?: number;
}

const MAX_FILES = 2; // Maximum number of files allowed

const VideoUpload: FC<VideoUploadProps> = ({
  label,
  onVideoChange,
  setPrev,
  lengthOldVideo,
}) => {
  const [inputKey, setInputKey] = useState(0); // очистка кеша файлов для добавления прошлых видео
  const [files, setFiles] = useState<File[]>([]); // State to keep track of selected video files
  const [previews, setPreviews] = useState<string[]>([]); // State for video previews
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setInputKey((prevKey) => prevKey + 1);
    setFiles([]); // Reset files when setPrev changes
    setPreviews([]); // Reset previews when setPrev changes
  }, [setPrev]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      // Filter out duplicates based on file name
      const newFiles = fileArray.filter(
        (file) =>
          !files.some((existingFile) => existingFile.name === file.name),
      );

      const lengOld = lengthOldVideo ? lengthOldVideo : 0;

      // Check if adding these new files would exceed the maximum limit
      if (lengOld + files.length + newFiles.length > MAX_FILES) {
        setError('Максимум 2 видео');
        return;
      }

      setError('');

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file)); // Create preview URLs

      setFiles((prev) => [...prev, ...newFiles]); // Update files state without duplicates
      setPreviews((prev) => [...prev, ...newPreviews]); // Update previews state without duplicates
      onVideoChange([...files, ...newFiles]); // Pass the selected video files to the parent
    } else {
      setPreviews([]); // Clear previews if no files selected
      onVideoChange(null); // Clear files in parent component
    }
  };

  //////////////////////// ЧТОБЫ НАЖАТИЕ ВЫЗЫВАЛО СОБЫТИЕ КОТОРОЕ НАДО ИЛИ ПРИ ПЕРЕХОДЕ НА СОЗДАНИЕ КАЛ НАЧНЕТСЯ

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    document.getElementById('videoUpload')?.click(); // Trigger file input
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
  };

  /////////////////////// ЧТОБЫ ВСПЛЫТИЕ ОСТАНАВЛИВАЛОСЬ И ВСЕ РАБОТАЛО КАК НАДО

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index)); // Remove preview
    setFiles((prev) => prev.filter((_, i) => i !== index)); // Remove file
    onVideoChange(files.filter((_, i) => i !== index)); // Pass updated files to parent
  };

  return (
    <div className={styles.videoUpload} onClick={handleClick}>
      <label className={styles.label}>{label}</label>
      <input
        key={inputKey}
        type="file"
        id="videoUpload"
        accept="video/*"
        multiple // Allow multiple video uploads
        onChange={handleVideoUpload}
        className={styles.fileInput}
      />
      <button
        type="button"
        className={styles.uploadButton}
        onClick={handleButtonClick} // Prevent event bubbling
      >
        Загрузить видео
      </button>
      {error && <p className="errorP">{error}</p>}
      {previews.length > 0 && (
        <div className={styles.previewContainer}>
          {previews.map((preview, index) => (
            <div key={index} className={styles.videoWrapper}>
              <video
                src={preview}
                controls
                width={100}
                height={100}
                className={styles.preview}
              />
              <button
                type="button"
                onClick={() => removePreview(index)} // Call removePreview on button click
                className={styles.removeButton}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
