import React, { useCallback, useState } from 'react';

import css from './PhotoUploader.module.css';
import Icon from '../../Icon/Icon';

import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

export default function PhotoUploader({ onChange, error, ...otherProps }) {
  const [image, setImage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      onChange(file);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const base64 = reader.result;
        setImage(base64);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  // title
  const subTitle = isDragActive
    ? 'Drop the photo here ...'
    : "Drag 'n' drop some photo here, or click to select photo";

  const titleUpload = <p className={css['title-upload']}>{subTitle}</p>;

  // Image after successful input
  const backgroundStyle =
    image.length > 0
      ? {
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : null;

  return (
    <>
      <div
        className={clsx(
          css['photo-uploader'],
          isDragActive && css['is-drag-active'],
          error && css.error
        )}
        {...getRootProps()}
        style={backgroundStyle}
      >
        <input {...otherProps} {...getInputProps()} accept="image/*" />

        {image.length === 0 && (
          <>
            <Icon
              name={'upload_photo'}
              size={50}
              className={clsx(
                css.icon,
                isDragActive && css['icon-is-drag-active']
              )}
            />
            {titleUpload}
          </>
        )}
      </div>
      {image.length > 0 && (
        <button className={css['btn-img-upload']} onClick={open} type="button">
          Upload another photo
        </button>
      )}
    </>
  );
}
