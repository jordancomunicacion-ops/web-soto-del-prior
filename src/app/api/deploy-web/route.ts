import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST() {
    try {
        // Ruta al script de despliegue
        const scriptPath = 'c:\\Users\\Carlos\\SOTOdelPRIOR\\Infraestructure\\DESPLEGAR_WEB.bat';

        console.log(`[API] Iniciando despliegue Web Independiente con script: ${scriptPath}`);

        exec(`"${scriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`[API] Error al ejecutar despliegue Web: ${error.message}`);
                return;
            }
            if (stderr) {
                console.warn(`[API] Stderr despliegue Web: ${stderr}`);
            }
            console.log(`[API] Stdout despliegue Web: ${stdout}`);
        });

        return NextResponse.json({ message: 'Proceso de actualización iniciado. La web se reiniciará en unos momentos.' });
    } catch (error) {
        console.error('[API] Error crítico en deploy-web:', error);
        return NextResponse.json({ error: 'Error interno al iniciar actualización' }, { status: 500 });
    }
}
