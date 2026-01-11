import React from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

// SSR disabled for the editor
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

export const MarkdownEditor = ({ value, onChange }) => {
  return (
    <SimpleMDE
      value={value}
      onChange={onChange}
      options={{
        autofocus: true,
        spellChecker: false,
        placeholder: 'Write your post here...',
        toolbar: [
          'bold', 'italic', 'heading', '|',
          'quote', 'unordered-list', 'ordered-list', '|',
          'link', 'image', '|',
          'preview', 'side-by-side', 'fullscreen', '|',
          'guide'
        ]
      }}
    />
  );
};