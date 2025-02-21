'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { ClipboardIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useEmojiStore } from '@/storage/decripe-storage'
import { toast } from "sonner"
import Link from 'next/link'


const emojiAlphabet: { [key: string]: string } = {
    A: "💧", B: "⚽", C: "🐶", D: "🎲", E: "🐘", F: "🔪", G: "🐱", H: "🚁",
    I: "⛪", J: "🐊", K: "🥝", L: "🍊", M: "✋🏻", N: "🎵", O: "🥚", P: "🍞",
    Q: "🧀", R: "🐭", S: "🐸", T: "🍅", U: "🍇", V: "🐮", W: "🧇", X: "☕",
    Y: "☯", Z: "🦓",
}

export default function TranslateEmoji() {
    const {
        input,
        setInput,
        output,
        translateToEmoji,
        saveTranslation,
        copyToClipboard
    } = useEmojiStore(state => state)

    const handleTranslateToEmoji = () => {
        translateToEmoji()
        toast('Tradução realizada com sucesso!', {
            duration: 2000,
            className: 'bg-green-500 text-white font-bold',
        })
    }
    
    const handleSaveTranslation = () => {
        saveTranslation()
        toast('Tradução salva com sucesso!', {            
            duration: 2000,
            className: 'bg-green-500 text-white font-bold',
        })
    }
    
    const handleCopyToClipboard = () => {
        copyToClipboard()
        toast('Texto copiado para a área de transferência!', {
            duration: 2000,
            className: 'bg-green-500 text-white font-bold',
        })
    }

    return (
        <Card className="max-w-xl w-full p-4 mx-auto shadow-lg rounded-lg">
            <CardHeader>
                <h2 className="text-lg font-semibold text-center mb-4">Conversor: Texto - Emoji</h2>

                {/* Área dos inputs */}
                <div className="flex flex-col gap-2 sm:gap-4">
                    {/* Input do usuário */}
                    <Input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Digite um texto"
                        className="w-full"
                    />

                    {/* Output + Botão de Copiar */}
                    <div className="flex items-center gap-2">
                        <Input type="text" value={output} readOnly className="w-full" />
                        <Button onClick={handleCopyToClipboard} className="flex items-center justify-center">
                            <ClipboardIcon size={20} />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button className="w-full sm:w-1/2" onClick={handleTranslateToEmoji}>Traduzir</Button>
                    <Button className="w-full sm:w-1/2" onClick={handleSaveTranslation}>Salvar</Button>
                </div>

                {/* Alfabeto Emoji */}
                <div className="mt-6 text-sm text-gray-600">
                    <p className="font-semibold text-center sm:text-left">Alfabeto Emoji:</p>
                    <p className="mt-2 text-center sm:text-left">
                        {Object.entries(emojiAlphabet).map(([letter, emoji]) => (
                            <span key={letter} className="mr-2">{letter}: {emoji}</span>
                        ))}
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={'/painel'} className='w-full'>
                    <Button className='w-full'>
                        Ir ao Painel
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
