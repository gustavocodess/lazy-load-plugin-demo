/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import ReactQuill from 'react-quill';

interface TextProps {
  value: string;
  onChange: () => void;
}

export default function RichTextEditor(props: TextProps) {
  return (
    <ReactQuill
      theme="snow"
      value={props.value}
      onChange={props.onChange}
    />
  );
}