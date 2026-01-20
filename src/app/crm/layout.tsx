import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CrmLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Campaign Generator</h1>
                <div className="flex gap-2">
                    <Link href="/crm"><Button variant="outline">Audience</Button></Link>
                    <Link href="/crm/campaigns"><Button variant="outline">Campaigns</Button></Link>
                </div>
            </div>
            <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                {children}
            </div>
        </div>
    )
}
