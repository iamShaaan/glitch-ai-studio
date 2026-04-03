import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <span
            className={cn("glitch-text relative inline-block font-bold uppercase", className)}
            data-text={text}
        >
            {text}
        </span>
    );
}
