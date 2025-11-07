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
    const [email, setEmail] = useState('')
    const [letter, setLetter] = useState('')
    const [typing, setTyping] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
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

    function validateForm() {
        const newErrors: { [key: string]: string } = {}

        // Navn
        if (name.trim().length < 2) newErrors.name = 'Du skal skrive et navn for at kunne sende brevet.'

        // Brev
        if (letter.trim().length < 2) newErrors.letter = 'Hvis du vil sende os et brev, skal du skrive noget i dette felt - ellers er der ikke så meget at sende.'

        // E-mail
        const cleanEmail = email.trim() // fjerner mellemrum før/efter
        if (cleanEmail.length > 0) {
            const hasAt = cleanEmail.includes('@')
            const hasDot = cleanEmail.includes('.')
            const atPos = cleanEmail.indexOf('@')
            const dotPos = cleanEmail.lastIndexOf('.')

            if (!hasAt) {
                newErrors.email = 'E-mail-adresse skal indeholde @.'
            } else if (!hasDot) {
                newErrors.email = 'E-mail-adresse skal indeholde et punktum.'
            } else if (
                atPos < 1 ||                // starter med @
                dotPos < atPos + 2 ||       // . kommer lige efter @
                dotPos === cleanEmail.length - 1 // . til sidst
            ) {
                newErrors.email = 'Ugyldig e-mail-adresse.'
            }
        }

        // Captcha
        const token = (window as any).hcaptcha?.getResponse?.() || ''
        if (!token) newErrors.token = 'Tryk i boksen ovenfor og følg vejledningen for at bekræfte, at du er et menneske.'

        return {valid: Object.keys(newErrors).length === 0, errors: newErrors, token}
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const {valid, errors: validationErrors, token} = validateForm()
        if (!valid) {
            setErrors(validationErrors)
            return
        }
        setSubmitting(true)
        setErrors({})
        try {
            const res = await fetch('/api/brevkasse', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, letter, token}),
            })
            if (!res.ok) throw new Error('Fejl ved afsendelse')
            setSuccess(true)
            setName('')
            setEmail('')
            setLetter('')
            ;(window as any).hcaptcha?.reset?.()
        } catch {
            alert('Noget gik galt. Prøv igen.')
        } finally {
            setSubmitting(false)
        }
    }

    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[--accent]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                <h2 className="text-2xl font-semibold text-[--accent]">Tak for dit brev!</h2>
                <p className="text-[--text-dim] text-lg">Vi har modtaget det – tak for din historie 📨</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-[90svh] px-4 sm:px-6 md:px-8">
            <Script src="https://hcaptcha.com/1/api.js?hl=da" async defer />

            <div className="ml-1">
            <h1 className="font-display text-4xl mb-4">Brevkasse</h1>

            <p className="text-[--text-dim] text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
                Har du en historie om noget teknologi eller et digitalt produkt, der er gået helt galt?
                Eller har du et spørgsmål om noget, der undrer dig, og som du synes, vi skal forklare?
                Så kan du sende os et brev – enten på mail eller via formularen herunder.
            </p>
            </div>
            <form
                onSubmit={onSubmit}
                className="card brevkasse-card flex flex-col flex-1 min-h-0 p-6 space-y-6"
            >
                {/* Navn */}
                <div>
                    <label className="block text-sm mb-1">Navn<span className="required-star">*</span> <span className="text-[#888]">(Behøver ikke være dit navn, det kan også være opdigtet, vi dømmer ikke)</span></label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 focus:outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm mb-1">
                        Din e-mail <span className="text-[#888]">(e-mail er ikke et krav, men den gør det lettere for os at stille opfølgende spørgsmål)</span>
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 focus:outline-none"
                        placeholder="fx navn@email.dk"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Brev */}
                <div className="flex-1 flex flex-col min-h-[30vh]">
                    <label className="block text-sm mb-1">Brev<span className="required-star">*</span></label>
                    <textarea
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        placeholder={typing}
                        className="flex-1 min-h-0 w-full rounded-md bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 focus:outline-none resize-none"
                    />
                    {errors.letter && <p className="text-red-500 text-sm mt-1">{errors.letter}</p>}
                </div>

                {/* Captcha */}
                <div>
                    <div className="h-captcha" data-sitekey={siteKey}></div>
                    {errors.token && <p className="text-red-500 text-sm mt-2">{errors.token}</p>}
                </div>

                {/* Button */}
                <div className="pt-8 pb-12">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-purple self-start w-[40vw] sm:w-[24vw] md:w-auto px-4"
                    >
                        Send brev
                    </button>
                </div>

                <p className="text-sm text-[#bbbbbb]">
                    Eller send dit brev direkte til{' '}
                    <a
                        href="mailto:brev@idioter.med.computer"
                        className="underline"
                        style={{ textDecorationColor: '#9b5de5' }}
                    >
                        brev@idioter.med.computer
                    </a>
                </p>
            </form>
        </div>
    )
}