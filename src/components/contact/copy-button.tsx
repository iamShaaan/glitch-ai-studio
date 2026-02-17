"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function CopyButton({ text, label }: { text: string; label?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success("Copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-mono"
            title="Copy to clipboard"
        >
            {label && <span>{label}</span>}
            <span className="bg-slate-800 p-2 rounded-md group-hover:bg-slate-700 transition-colors border border-slate-700">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </span>
        </button>
    );
}
