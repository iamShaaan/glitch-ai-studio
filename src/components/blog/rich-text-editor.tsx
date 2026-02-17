"use client";

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-64 bg-slate-900 animate-pulse rounded-md" />
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

import { useMemo } from 'react';

// ... (imports)

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    const formats = useMemo(() => [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ], []);

    return (
        <div className="bg-slate-950 text-slate-100 rounded-md overflow-hidden border border-slate-700 focus-within:border-emerald-500 transition-colors">
            <style jsx global>{`
                .ql-toolbar.ql-snow {
                    border-color: #334155 !important;
                    background-color: #0f172a;
                }
                .ql-container.ql-snow {
                    border-color: #334155 !important;
                    background-color: #020617;
                    font-size: 1rem;
                    min-height: 200px;
                }
                .ql-editor {
                    color: #e2e8f0;
                }
                .ql-stroke {
                    stroke: #94a3b8 !important;
                }
                .ql-fill {
                    fill: #94a3b8 !important;
                }
                .ql-picker {
                    color: #94a3b8 !important;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || 'Write something amazing...'}
                className="h-full"
            />
        </div>
    );
};
