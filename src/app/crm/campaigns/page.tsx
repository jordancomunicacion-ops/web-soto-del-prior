import { getCampaigns, createCampaign } from "../../actions/crm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { revalidatePath } from "next/cache"

export const dynamic = 'force-dynamic'

export default async function CampaignsPage() {
    const campaigns = await getCampaigns()

    async function create(formData: FormData) {
        "use server"
        await createCampaign({
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            subject: formData.get('subject') as string,
            content: formData.get('content') as string
        })
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Campaigns</h2>

                {/* Simple Form for MVP demo */}
                <form action={create} className="flex gap-2">
                    <Input name="name" placeholder="Campaign Name" required className="w-40" />
                    <select name="type" className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="EMAIL">Email</option>
                        <option value="WHATSAPP">WhatsApp</option>
                    </select>
                    <Button type="submit">Quick Create</Button>
                </form>
            </div>

            <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Sent</th>
                            <th className="p-3">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((c) => (
                            <tr key={c.id} className="border-t hover:bg-muted/50">
                                <td className="p-3 font-medium">{c.name}</td>
                                <td className="p-3">{c.type}</td>
                                <td className="p-3"><Badge variant={c.status === 'SENT' ? 'secondary' : 'outline'}>{c.status}</Badge></td>
                                <td className="p-3">{c.sentCount}</td>
                                <td className="p-3">{c.createdAt.toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {campaigns.length === 0 && (
                            <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No campaigns created yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
