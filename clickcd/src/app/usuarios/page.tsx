"use client";

import { useEffect, useState } from 'react'

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: string;
  plano: string;
  whatsapp: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    // Fetching users from the API
    const fetchUsuarios = async () => {
      const response = await fetch('/api/usuarios')
      const data: Usuario[] = await response.json()
      setUsuarios(data)
    }

    fetchUsuarios()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  )
}