import App from 'App';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import '../../../../node_modules/react-quill/dist/quill.snow.css';

const Editor = () => {
  const [body, setBody] = useState('');
  const [files, setFiles] = useState('');
  const [previewURL, setPreviewURL] = useState('');

  const [isOpen, setOpen] = useState(false);
  let ReactQuill =
    isOpen && typeof window === 'object' ? require('react-quill') : () => false;

  const handleBody = (e) => {
    // console.log(e);
    setBody(e);
  };

  const handleImg = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFiles(file);
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  App.modules = {
    toolbar: [
      [
        { header: '1' },
        { header: '2' },
        { header: [3, 4, 5, 6] },
        { font: [] },
      ],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
    ],
  };

  App.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
  ];

  return (
    <div>
      {!!ReactQuill && isOpen && (
        <ReactQuill
          placeholder='내용을 입력해주세요'
          modules={App.modules}
          formats={App.formats}
          onChange={handleBody}
          value={body}
        />
      )}
      <div className='preview'></div>
    </div>
  );
};

export default Editor;
