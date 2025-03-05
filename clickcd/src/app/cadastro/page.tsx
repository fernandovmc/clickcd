"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    nome: string;
    email: string;
    senha: string;
    whatsapp?: string;
    tipo_usuario: string;
}

const tiposUsuario = [
    { label: "Admin", value: "ADMIN" },
    { label: "Cliente", value: "CLIENTE" },
    { label: "Transportadora", value: "TRANSPORTADORA" },
    { label: "Indústria", value: "INDUSTRIA" },
    { label: "Centro de Distribuição", value: "CENTRO_DISTRIBUICAO" }
];

export default function CadastroUsuario() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    if (!isClient) {
        return null;
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setMessage(null);
        setMessageType(null);

        try {
            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            setMessage("Usuário cadastrado com sucesso!");
            setMessageType("success");
            reset();
        } catch (error) {
            if (error instanceof Error) {
                setMessage("Erro ao cadastrar: " + error.message);
            } else {
                setMessage("Erro ao cadastrar");
            }
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    const formatWhatsapp = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return value;
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#F9F9F9] shadow-lg shadow-gray-500 rounded-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#2a2a2a" }}>Cadastro de Usuário</h2>
            {message && (
                <p className="mb-4 text-center text-sm font-semibold" style={{ color: messageType === "success" ? "green" : "red" }}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" placeholder="Nome" {...register("nome", { required: true })} className="w-full p-2 border rounded" style={{ borderColor: "#dad3be" }} />
                <input type="email" placeholder="Email" {...register("email", { 
                    required: "Email é obrigatório", 
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido"
                    }
                })} className="w-full p-2 border rounded" style={{ borderColor: "#dad3be" }} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <input type="password" placeholder="Senha" {...register("senha", { required: true })} className="w-full p-2 border rounded" style={{ borderColor: "#dad3be" }} />
                <input type="text" placeholder="Número de Telefone" {...register("whatsapp", { maxLength: 15 })} className="w-full p-2 border rounded" style={{ borderColor: "#dad3be" }} onChange={(e) => e.target.value = formatWhatsapp(e.target.value)} maxLength={15} />
                
                <select {...register("tipo_usuario", { required: true })} className="w-full p-2 border rounded" style={{ borderColor: "#dad3be" }}>
                    {tiposUsuario.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading} className="w-full p-2 text-white rounded hover:bg-[#ff6f3d]" style={{ backgroundColor: "#2a2a2a" }}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
        </div>
    );
}
