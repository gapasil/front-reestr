import React, { FC, useEffect, useState } from 'react';
import styles from './imageUpload.module.scss';
import Image from 'next/image';

interface ImageUploadProps {
  label: string;
  onImageChange: (files: File[] | null) => void; // Function to pass the selected files
  setPrev: boolean; // Prop to reset previews
  lengthOldImage?: number;
}

const MAX_FILES = 10; // Maximum number of files allowed

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  onImageChange,
  setPrev,
  lengthOldImage,
}) => {
  const [inputKey, setInputKey] = useState(0); // очистка кеша файлов для добавления прошлых картинок
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]); // State for image previews
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setInputKey((prevKey) => prevKey + 1);
    setFiles([]); // Reset files when setPrev changes
    setPreviews([]); // Reset previews when setPrev changes
  }, [setPrev]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      // Filter out duplicates based on file name
      const newFiles = fileArray.filter(
        (file) =>
          !files.some((existingFile) => existingFile.name === file.name),
      );

      const lengOld = lengthOldImage ? lengthOldImage : 0;

      if (lengOld + files.length + newFiles.length > MAX_FILES) {
        setError('Максимум 10 картинок');
        return;
      }
      setError('');

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file)); // Create preview URLs

      setFiles((prev) => [...prev, ...newFiles]); // Update files state without duplicates
      setPreviews((prev) => [...prev, ...newPreviews]); // Update previews state without duplicates
      onImageChange([...files, ...newFiles]); // Pass the selected files to the parent
    } else {
      setPreviews([]); // Clear previews if no files selected
      onImageChange(null); // Clear files in parent component
    }
  };

  //////////////////////// ЧТОБЫ НАЖАТИЕ ВЫЗЫВАЛО СОБЫТИЕ КОТОРОЕ НАДО ИЛИ ПРИ ПЕРЕХОДЕ НА СОЗДАНИЕ КАЛ НАЧНЕТСЯ

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    document.getElementById('imageUpload')?.click(); // Trigger file input
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
  };

  /////////////////////// ЧТОБЫ ВСПЛЫТИЕ ОСТАНАВЛИВАЛОСЬ И ВСЕ РАБОТАЛО КАК НАДО

  const removePreview = (index: number) => {
    // Update previews and files arrays
    setPreviews((prev) => prev.filter((_, i) => i !== index)); // Remove preview
    setFiles((prev) => prev.filter((_, i) => i !== index)); // Remove file
    onImageChange(files.filter((_, i) => i !== index)); // Pass updated files to parent
  };

  return (
    <div className={styles.imageUpload} onClick={handleClick}>
      <label className={styles.label}>{label}</label>
      <input
        key={inputKey}
        type="file"
        id="imageUpload"
        accept="image/*"
        multiple // Allow multiple file uploads
        onChange={handleImageUpload}
        className={styles.fileInput}
      />
      <button
        type="button"
        className={styles.uploadButton}
        onClick={handleButtonClick} // Prevent event bubbling
      >
        Загрузить изображения
      </button>
      {error && <p className="errorP">{error}</p>}
      {previews.length > 0 && (
        <div className={styles.previewContainer}>
          {previews.map((preview, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={preview}
                alt={`Image Preview ${index + 1}`}
                width={250}
                height={250}
                quality={100}
                className={styles.preview}
                style={{ objectFit: 'cover' }}
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

export default ImageUpload;
