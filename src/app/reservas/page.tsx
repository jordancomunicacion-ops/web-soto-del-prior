"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingHubPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Centro de Reservas</h1>
                    <p className="text-lg text-muted-foreground">
                        Gestiona tu negocio de hospitalidad: Hotel y Restaurante.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MONITOR DE ADMINISTRACIÓN */}
                    <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-2">💎</div>
                            <CardTitle className="text-2xl">Panel de Administración</CardTitle>
                            <CardDescription>
                                Centro de mando para tu negocio.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                            <p>• Gestionar <strong>Hotel</strong> (Habitaciones, Tarifas, iCal).</p>
                            <p>• Gestionar <strong>Restaurante</strong> (Mesas, Zonas).</p>
                            <p>• Ver todas las reservas entrantes.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full text-lg" size="lg">
                                <Link href="http://localhost:3001/admin" target="_blank">
                                    Abrir Panel de Control ↗
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* CONFIGURACIÓN */}
                    <Card className="border-l-4 border-l-slate-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-2">🎨</div>
                            <CardTitle className="text-2xl">Integración y Configuración</CardTitle>
                            <CardDescription>
                                Personaliza la apariencia y estilos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                            <p>• <strong>Editor CSS</strong>: Coincide con los colores de tu marca.</p>
                            <p>• <strong>Código de Integración</strong>: Obtén enlaces para tu web.</p>
                            <p>• Configuración del sistema y usuarios.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="secondary" className="w-full text-lg" size="lg">
                                <Link href="http://localhost:3001/admin/widget-config" target="_blank">
                                    Abrir Configuración ↗
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* WIDGET HOTEL */}
                    <Card className="bg-blue-50/50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-blue-700">
                                <span>🏨 Widget de Hotel</span>
                                <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-800">Público</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-900 mb-4">
                                La interfaz de reservas para que tus huéspedes reserven habitaciones.
                            </p>
                            <Button asChild variant="outline" className="w-full border-blue-300 hover:bg-blue-100 text-blue-700">
                                <Link href="http://localhost:3001/widget" target="_blank">
                                    Ver Widget en Vivo
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* WIDGET RESTAURANTE */}
                    <Card className="bg-orange-50/50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-orange-700">
                                <span>🍽️ Widget de Restaurante</span>
                                <span className="text-xs bg-orange-100 px-2 py-1 rounded text-orange-800">Público</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-orange-900 mb-4">
                                El sistema de reserva de mesas para comensales.
                            </p>
                            <Button asChild variant="outline" className="w-full border-orange-300 hover:bg-orange-100 text-orange-700">
                                <Link href="http://localhost:3001/widget/restaurant" target="_blank">
                                    Ver Widget en Vivo
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center text-sm text-gray-400 pt-8">
                    Motor de Reservas V2 • Desarrollado por SOTOdelPRIOR
                </div>
            </div>
        </div>
    );
}
