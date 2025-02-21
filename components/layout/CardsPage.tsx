import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { SmileIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const events = [
    {
        id: "emoji-translator",
        title: "Tradutor de Emoji",
        description: "Transforme textos em sequências divertidas de emojis de forma rápida e fácil.",
        icon: <SmileIcon size={40} />,
        iconColor: "text-red-500",
        href: "/decripe",
    },
]

export const CardsPage = () => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center p-4">
            {events.map((event) => (
                <Card key={event.id} className={`p-4  rounded-lg shadow-md w-full max-w-xl hover:shadow-xl hover:scale-110`}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${event.iconColor}`}>
                                {event.icon}
                            </div>
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mt-2 text-md text-gray-600">{event.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={event.href}>
                            <Button>Ir para Tradutor</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
