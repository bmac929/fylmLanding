import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, 
  Youtube as YoutubeIcon, Undo, Redo, Save
} from 'lucide-react';

const MenuBar = ({ editor, onSave }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter the URL of the YouTube video:');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-white/10 p-2 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-white/10 ${
          editor.isActive('bold') ? 'bg-white/10' : ''
        }`}
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-white/10 ${
          editor.isActive('italic') ? 'bg-white/10' : ''
        }`}
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-white/10 ${
          editor.isActive('bulletList') ? 'bg-white/10' : ''
        }`}
      >
        <List size={20} />
      </button>
      <button
        onClick={setLink}
        className={`p-2 rounded hover:bg-white/10 ${
          editor.isActive('link') ? 'bg-white/10' : ''
        }`}
      >
        <LinkIcon size={20} />
      </button>
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-white/10"
      >
        <ImageIcon size={20} />
      </button>
      <button
        onClick={addYoutubeVideo}
        className="p-2 rounded hover:bg-white/10"
      >
        <YoutubeIcon size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-white/10"
      >
        <Undo size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-white/10"
      >
        <Redo size={20} />
      </button>
      <button
        onClick={onSave}
        className="ml-auto px-4 py-2 bg-secondary text-primary rounded-lg 
                 hover:bg-secondary/90 transition-colors flex items-center gap-2"
      >
        <Save size={20} />
        Save
      </button>
    </div>
  );
};

const BlogEditor = ({ initialContent = null, onChange, onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Youtube,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...'
      })
    ],
    content: initialContent || {
      type: 'doc',
      content: [{ type: 'paragraph' }]
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    }
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      <MenuBar editor={editor} onSave={onSave} />
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4"
      />
    </div>
  );
};

export default BlogEditor;