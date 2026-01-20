"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProfiles() {
    return await prisma.customerProfile.findMany({
        orderBy: { updatedAt: 'desc' },
        include: { campaigns: true }
    })
}

export async function getCampaigns() {
    return await prisma.campaign.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createCampaign(data: { name: string; type: string; subject?: string; content: string }) {
    const campaign = await prisma.campaign.create({
        data: {
            name: data.name,
            type: data.type,
            subject: data.subject,
            content: data.content,
            status: 'DRAFT'
        }
    })
    revalidatePath('/crm')
    return campaign
}
