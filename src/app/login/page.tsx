'use client'

import { authenticate } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { ChefHat, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-orange-500/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-zinc-900/50 rounded-2xl border border-zinc-800 shadow-xl">
                        <ChefHat className="h-10 w-10 text-orange-500" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                    Kitchen OS
                </h2>
                <p className="mt-2 text-center text-sm text-zinc-400">
                    Inicia sesión para acceder a la gestión
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="bg-zinc-900/50 py-8 px-4 shadow-2xl border border-zinc-800 sm:rounded-3xl sm:px-10 backdrop-blur-sm">
                    <form action={dispatch} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-300"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-xl border-zinc-700 bg-zinc-950/50 text-zinc-100 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 placeholder-zinc-500 transition-colors"
                                    placeholder="admin@kitchen.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-zinc-300"
                            >
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-xl border-zinc-700 bg-zinc-950/50 text-zinc-100 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 placeholder-zinc-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-orange-600 focus:ring-orange-500/20"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-400">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-orange-500 hover:text-orange-400">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <div>
                            <LoginButton />
                        </div>

                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-red-500">
                                        {errorMessage}
                                    </p>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button
            aria-disabled={pending}
            type="submit"
            className="flex w-full justify-center items-center rounded-xl bg-orange-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
            {pending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    Iniciar Sesión <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    )
}
