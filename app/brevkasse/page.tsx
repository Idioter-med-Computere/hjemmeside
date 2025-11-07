'use client'

import {useEffect, useRef, useState} from 'react'
import Script from 'next/script'

const SAMPLE = `Kære idioter med computere
Jeg har fået at vide, at vi skal have en app.
Jeg er ikke helt sikker på, hvad den skal kunne – men folk bruger jo deres telefoner til alting i dag…
Så det virker oplagt.

Jeg har fundet en hjemmeside, hvor man kan købe en færdig app for 2.595 kroner.

Det virker da nemmere end at bygge en fra bunden, ikke?

De virker erfarne, dem der står bag siden – så det må jo være godt.
Kan man ikke bare købe sådan en skabelon og så få jer til at rette lidt i den bagefter?
Det virker mere effektivt, synes jeg.

Venlig hilsen
Kristian, 45 år
Bogholder hos Oles Murerservice`

export default function BrevkassePage() {
    const [name, setName] = useState('')
    const [letter, setLetter] = useState('')
    const [typing, setTyping] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const idxRef = useRef(0)

    useEffect(() => {
        setTyping('')
        idxRef.current = 0
        const id = setInterval(() => {
            idxRef.current += 1
            setTyping(SAMPLE.slice(0, idxRef.current))
            if (idxRef.current >= SAMPLE.length) clearInterval(id)
        }, 18)
        return () => clearInterval(id)
    }, [])

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)
        try {
            const token = (window as any).hcaptcha?.getResponse?.() || ''
            const res = await fetch('/api/brevkasse', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, letter, token}),
            })
            if (!res.ok) throw new Error('Fejl ved afsendelse')
            alert('Tak for dit brev!')
            setName('')
            setLetter('')
            ;(window as any).hcaptcha?.reset?.()
        } catch (err) {
            alert('Noget gik galt. Prøv igen.')
        } finally {
            setSubmitting(false)
        }
    }

    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY

    return (
        <div className="space-y-6">
            <Script src="https://hcaptcha.com/1/api.js" async defer/>
            <h1 className="font-display text-4xl">Brevkasse</h1>
            <form onSubmit={onSubmit} className="card brevkasse-card p-6 space-y-4 min-h-[80vh] flex flex-col">
                <div>
                    <label className="block text-sm mb-1">Navn</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 focus:outline-none" required/>
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="block text-sm mb-1">Brev</label>
                    <textarea value={letter} onChange={(e) => setLetter(e.target.value)} placeholder={typing}
                              className="flex-1 min-h-[50vh] w-full rounded-md bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 focus:outline-none resize-none"
                              required/>
                </div>
                <div className="my-2">
                    <div className="h-captcha" data-sitekey={siteKey}></div>
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-purple self-start w-[40vw] sm:w-[24vw] md:w-auto px-4 mt-8 mb-10"
                >
                    Send brev
                </button>
                <p className="text-sm text-[#bbbbbb]">Eller send dit brev direkte til <a href="mailto:brev@idiotermedcomputere.dk" className="underline" style={{textDecorationColor: '#9b5de5'}}>brev@idiotermedcomputere.dk</a></p>
            </form>
        </div>
    )
}