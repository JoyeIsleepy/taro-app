import React, { useEffect, useState } from 'react';
import { Uploader } from '@nutui/nutui-react-taro';
import { uploadFile } from '@/utils/upload';

const CustomUploader = ({ value, onChange, maxCount = 3, autoUpload = true, ...restProps }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!Array.isArray(value)) return;
    const arr = value.map(r => {
      const { file, path, message, ...rest } = r;
      return rest;
    });
    setFileList(arr);
  }, [value]);

  // 实际上传
  const handleUpload = async file => {
    const res = await uploadFile(file);
    const url = res?.result?.url;
    if (!url) {
      return { status: 'error', message: '上传失败' };
    }
    return {
      url,
      name: file.name || 'image.png',
      status: 'success',
    };
  };

  const handleChange = files => {
    setFileList(files);
    onChange?.(files);
  };

  return (
    <Uploader
      value={fileList}
      upload={handleUpload}
      autoUpload={autoUpload}
      maxCount={maxCount}
      onChange={handleChange}
      {...restProps}
    />
  );
};

export default CustomUploader;
