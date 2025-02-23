'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEmojiStore } from '@/storage/decripe-storage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from "sonner"

export default function Page() {

    const router = useRouter();

    const translations = useEmojiStore(state => state.translations)
    const deleteItem = useEmojiStore(state => state.deleteItem)

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Texto copiado para a área de transferência.")
    } 

    const handleDelete = (originalText: string) => {
        deleteItem(originalText)
        toast.success(`Texto "${originalText}" excluído com sucesso.`)
    }

    return (
        <main className='w-full h-screen flex justify-center py-10 bg-gray-100'>
            <div className="container max-w-7xl px-4">
                <div>
                <h2 className='py-4 text-3xl font-bold text-start text-gray-800'>Traduções Salvas</h2>
                <Button onClick={() => router.back()}>Voltar</Button>
                </div>
                <Separator className='my-8 border border-black'/>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        translations.map((translation) => (
                            <Card key={translation.original} className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
                                    <h3 className='text-xl font-semibold'>Texto Original</h3>
                                    <p className='text-lg'>{translation.original}</p>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <h3 className='text-xl font-semibold'>Texto Traduzido</h3>
                                    <p className='text-lg'>{translation.translated}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center p-4 bg-gray-200 rounded-b-lg">
                                    <Button 
                                        onClick={() => handleCopy(translation.translated)}
                                        className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full transition-colors duration-200">
                                        Copy
                                    </Button>
                                    <Button 
                                        onClick={() => handleDelete(translation.original)} 
                                        className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-full transition-colors duration-200">
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}
