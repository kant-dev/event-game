import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Translation {
    original: string
    translated: string
}

interface ScrambleTranslation {
    input: string
    output: string
    translations: Translation[]
    setInput: (input: string) => void
    setOutput: (output: string) => void
    scrambleTranslation: () => void
    saveTranslation: () => void
    copyToClipboard: () => void
    deleteItem: (text: string) => void
}

const shuffleWord = (word: string): string => {
    if (word.length <= 3) return word

    const middle = word.slice(1, -1).split("")
    for (let i = middle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[middle[i], middle[j]] = [middle[j], middle[i]]
    }

    // Ensure the shuffled word is different from the original
    const shuffled = word[0] + middle.join("") + word[word.length - 1]
    return shuffled === word ? shuffleWord(word) : shuffled
}

export const useScramblerStore = create<ScrambleTranslation>()(
    persist(
        (set, get) => ({
            input: "",
            output: "",
            translations: [],
            setInput: (input: string) => set({ input }),
            setOutput: (output: string) => set({ output }),
            scrambleTranslation: () => {
                const { input } = get()
                const words = input.split(/(\s+)/)
                const scrambledWords = words.map((word) => (/\s+/.test(word) ? word : shuffleWord(word)))
                const scrambled = scrambledWords.join("")
                set({ output: scrambled })
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
                set({
                    translations: translations.filter((t) => t.original !== text && t.translated !== text),
                })
            },
        }),
        {
            name: "ScramblerStore",
        },
    ),
)

