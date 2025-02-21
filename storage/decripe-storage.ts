import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Translation {
    original: string
    translated: string
}

interface EmojiState {
    input: string
    output: string
    translations: Translation[]
    setInput: (input: string) => void
    setOutput: (output: string) => void
    translateToEmoji: () => void
    saveTranslation: () => void
    copyToClipboard: () => void
    deleteItem: (text: string) => void
}

const emojiAlphabet: { [key: string]: string } = {
    A: "💧", B: "⚽", C: "🐶", D: "🎲", E: "🐘", F: "🔪", G: "🐱", H: "🚁",
    I: "⛪", J: "🐊", K: "🥝", L: "🍊", M: "✋🏻", N: "🎵", O: "🥚", P: "🍞",
    Q: "🧀", R: "🐭", S: "🐸", T: "🍅", U: "🍇", V: "🐮", W: "🧇", X: "☕",
    Y: "☯", Z: "🦓",
}

export const useEmojiStore = create<EmojiState>()(
    persist(
        (set, get) => ({
            input: "",
            output: "",
            translations: [],
            setInput: (input: string) => set({ input }),
            setOutput: (output: string) => set({ output }),
            translateToEmoji: () => {
                const { input } = get()
                const translated = input
                    .toUpperCase()
                    .split("")
                    .map((char) => {
                        if (char === " ") return " "
                        return emojiAlphabet[char] || char
                    })
                    .join("")
                set({ output: translated })
            },
            saveTranslation: () => {
                const { input, output, translations } = get()
                if (input && output) {
                    set({
                        translations: [...translations, { original: input, translated: output }],
                        input: "",
                        output: "",
                    })
                }
            },
            copyToClipboard: () => {
                const { output } = get()
                if (output) {
                    navigator.clipboard.writeText(output)
                }
            },
            deleteItem: (text: string) => {
                const { translations } = get()
                const index = translations.findIndex((t) => t.original === text)
            
                if (index !== -1) {
                    set({
                        translations: [
                            ...translations.slice(0, index),
                            ...translations.slice(index + 1),
                        ],
                    })
                }
            },
        }),
        {
            name: "emoji-storage",
        },
    ),
)

