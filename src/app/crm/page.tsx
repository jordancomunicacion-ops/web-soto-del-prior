import { getProfiles } from "../actions/crm"
import { Badge } from "@/components/ui/badge"

export const dynamic = 'force-dynamic'

export default async function AudiencePage() {
    const profiles = await getProfiles()

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Unified Audience ({profiles.length})</h2>
            <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                            <th className="p-3">Identity</th>
                            <th className="p-3">Tags</th>
                            <th className="p-3">Spend</th>
                            <th className="p-3">Channels</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile) => (
                            <tr key={profile.id} className="border-t hover:bg-muted/50">
                                <td className="p-3 font-medium">
                                    {profile.firstName || 'Guest'} {profile.lastName}<br />
                                    <span className="text-xs text-muted-foreground">{profile.email}</span>
                                </td>
                                <td className="p-3"><Badge variant="outline">{profile.systemTags || 'LEAD'}</Badge></td>
                                <td className="p-3">€{Number(profile.totalSpend)}</td>
                                <td className="p-3 space-x-1">
                                    {profile.consentEmail && <Badge className="bg-blue-500">EMAIL</Badge>}
                                    {profile.consentWhatsApp && <Badge className="bg-green-500">WA</Badge>}
                                </td>
                            </tr>
                        ))}
                        {profiles.length === 0 && (
                            <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No profiles found yet. Connect Booking/POS first.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
