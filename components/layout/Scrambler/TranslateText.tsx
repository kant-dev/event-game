'use client'

import React from 'react'
import { ClipboardIcon } from 'lucide-react'
import { toast } from "sonner"
import Link from 'next/link'
import { useScramblerStore } from '@/storage/scrambler-storage'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function TranslateText() {
    const {
        input,
        setInput,
        output,
        scrambleTranslation,
        saveTranslation,
        copyToClipboard
    } = useScramblerStore(state => state)

    const handleTranslateToEmoji = () => {
        scrambleTranslation()
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
                <h2 className="text-lg font-semibold text-center mb-4">Embaralhar Texto</h2>

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
            </CardContent>
            <CardFooter>
                <Link href={'/painel-sc'} className='w-full'>
                    <Button className='w-full'>
                        Ir ao Painel
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
