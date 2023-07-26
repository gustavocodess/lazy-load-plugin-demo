/** @jsx jsx */
import React from 'react';
import { reaction } from 'mobx'
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from './Header'



const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

interface TextProps {
  value: string;
  onChange: () => void;
}

function RichTextEditor(props: TextProps) {
  return (
    <ReactQuill
      theme="snow"
      value={props.value}
      onChange={props.onChange}
      modules={modules}
      formats={formats}
    />
  );
}

Builder.registerEditor({
  /**
   * Here we override the built-in richtext editor.
   */
  name: 'html',
  component: RichTextEditor,
});


// Builder.registerEditor({
//   /**
//    * Here we override the built-in richtext editor.
//    */
//   name: 'other html',
//   component: React.lazy(() => System.import('./RegisterDefault')),
// });
const pluginId = 'my-custom-plugin'
Builder.register('plugin', {
  // should match npm id if loading from npm
  id: pluginId,
})

function CustomButton() {
  return (
    <div>
      <button name='btn' onClick={() => alert('clicked')}>
        Click me
      </button>
    </div>
  )
}

reaction(
  () => true,
  (advancedMode) => {
    Builder.register('editor.header', { component: Header });
    Builder.register('editor.settings', {
      // hideHeatMap: true,
      hideCommentsTab: true,
      // hideGetFeedbackLink: true,
      hideHelpWidget: true,
      // hideMainTabs: false,
      // hideOptionsTab: true,
    })
    // Builder.register('editor.header', {
    //   component: CustomButton,
    // })
    
  },
  {
    fireImmediately: true,
  }
)