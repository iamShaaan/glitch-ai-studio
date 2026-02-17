import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
}

export function GlitchText({ text, className, as: Component = "span" }: GlitchTextProps) {
    return (
        <Component
            className={cn("glitch-text relative inline-block font-bold uppercase", className)}
            data-text={text}
        >
            {text}
        </Component>
    );
}
