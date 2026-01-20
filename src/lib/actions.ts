'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)

        // Disparar inicio del sistema (Ganadería) en segundo plano
        // No esperams a que termine para no bloquear el login
        const { exec } = require('child_process');
        const command = 'docker compose -f "C:\\Users\\Carlos\\SOTOdelPRIOR\\Infraestructure\\apps\\ganaderia-soto\\docker-compose.yml" up -d';

        exec(command, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error iniciando sistema: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr iniciando sistema: ${stderr}`);
                return;
            }
            console.log(`Sistema iniciado correctamente: ${stdout}`);
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.' // Mensaje en español
                default:
                    return 'Algo salió mal.'
            }
        }
        throw error
    }
}
