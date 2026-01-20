import Link from "next/link"
import { Button } from "@/components/ui/button"
import AdminGuard from "@/components/admin/admin-guard"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminGuard>
            <div className="flex h-screen w-full flex-col md:flex-row bg-muted/40">
                <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                    <div className="flex h-14 items-center border-b px-6 font-semibold lg:h-[60px]">
                        SOTOdelPRIOR Admin
                    </div>
                    <nav className="flex-1 overflow-auto py-4">
                        <ul className="grid gap-1 px-2 text-sm font-medium">
                            <li>
                                <Link href="/reservas/admin">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Dashboard
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservas/admin/reservations">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Reservations
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservas/admin/availability">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Availability
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservas/admin/analytics">
                                    <Button variant="ghost" className="w-full justify-start text-blue-600">
                                        Analytics 📊
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </AdminGuard>
    )
}
