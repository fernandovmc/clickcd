import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/usuarios
export async function GET() {
    try {
        const usuarios = await prisma.usuarios.findMany();
        return NextResponse.json(usuarios);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// POST /api/usuarios
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Corpo da requisição vazio" }, { status: 400 });
        }

        const { nome, email, senha, tipo_usuario, plano, whatsapp } = body;

        if (!nome || !email || !senha || !tipo_usuario) {
            return NextResponse.json({ error: "Campos obrigatórios estão faltando" }, { status: 400 });
        }

        const novoUsuario = await prisma.usuarios.create({
            data: { 
                nome, 
                email, 
                senha, 
                tipo_usuario, 
                plano: String(plano),
                whatsapp 
            }
        });

        return NextResponse.json(novoUsuario, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to create user:", error.message);
        } else {
            console.error("Failed to create user:", error);
        }
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
