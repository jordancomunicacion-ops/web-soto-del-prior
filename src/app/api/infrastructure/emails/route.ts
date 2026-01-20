import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

// Path to Docker executable (hardcoded for stability in current session)
// If this fails, we could fallback to 'docker'
const DOCKER_PATH = '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe"';
const CONTAINER_NAME = 'soto_mailserver';

/**
 * GET: List all email accounts
 */
export async function GET() {
    try {
        // Command to list emails: docker exec soto_mailserver setup email list
        const { stdout, stderr } = await execAsync(`${DOCKER_PATH} exec ${CONTAINER_NAME} setup email list`);

        if (stderr && !stdout) {
            console.error('Docker Error:', stderr);
            return NextResponse.json({ error: 'Error listing emails' }, { status: 500 });
        }

        // Parse output
        // Output format usually:
        // * user1@domain.com
        // * user2@domain.com
        const emails = stdout.split('\n')
            .filter(line => line.includes('@'))
            .map(line => {
                // Clean up the line (remove * and spaces)
                return line.replace('*', '').trim();
            })
            .filter(email => email.length > 0);

        return NextResponse.json({ emails });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to connect to Mail Server', details: error.message }, { status: 500 });
    }
}

/**
 * POST: Create a new email account
 */
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and Password are required' }, { status: 400 });
        }

        // Command to add email: docker exec soto_mailserver setup email add <email> <password>
        // Security Note: In a real prod env, sanitize inputs strictly. 
        await execAsync(`${DOCKER_PATH} exec ${CONTAINER_NAME} setup email add "${email}" "${password}"`);

        return NextResponse.json({ success: true, message: `Email ${email} created successfully` });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create email', details: error.message }, { status: 500 });
    }
}

/**
 * DELETE: Remove an email account
 */
export async function DELETE(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await execAsync(`${DOCKER_PATH} exec ${CONTAINER_NAME} setup email del "${email}"`);

        return NextResponse.json({ success: true, message: `Email ${email} deleted successfully` });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete email', details: error.message }, { status: 500 });
    }
}
