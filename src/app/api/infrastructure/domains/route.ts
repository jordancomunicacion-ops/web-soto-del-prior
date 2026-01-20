import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Path to Deployment/nginx/conf.d
// Assuming the app is running in the root of the repo, Deployment is at ./Deployment
const DEPLOYMENT_PATH = path.join(process.cwd(), 'Deployment', 'nginx', 'conf.d');

/**
 * GET: List configured domains
 */
export async function GET() {
    try {
        // Check if directory exists
        try {
            await fs.access(DEPLOYMENT_PATH);
        } catch {
            return NextResponse.json({ domains: [] }); // No domains configured yet
        }

        const files = await fs.readdir(DEPLOYMENT_PATH);
        const domains = [];

        for (const file of files) {
            if (file.endsWith('.conf') && file !== 'default.conf') {
                const filePath = path.join(DEPLOYMENT_PATH, file);
                const content = await fs.readFile(filePath, 'utf-8');

                // Simple regex to extract server_name
                const match = content.match(/server_name\s+(.*?);/);

                if (match && match[1]) {
                    const domainName = match[1].trim().split(' ')[0]; // Take the first one if multiple
                    // Determine type based on filename or content logic
                    let type = 'Static Web';
                    if (content.includes('proxy_pass')) type = 'Next.js App';
                    if (file.includes('mail')) type = 'Mail Webmail';

                    // Check status (Placeholder logic, real check would involve curling)
                    // For now, if config exists, we assume Active

                    domains.push({
                        id: file,
                        name: domainName,
                        provider: 'Self-Hosted (VPS)',
                        type: type,
                        status: 'Active',
                        renewal: 'Permanent' // It's your server
                    });
                }
            }
        }

        return NextResponse.json({ domains });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to load domains', details: error.message }, { status: 500 });
    }
}
