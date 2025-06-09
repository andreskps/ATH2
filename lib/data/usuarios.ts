import { getRolesByUsuarioId } from "./roles"

export interface Usuario {
  id: string
  nombre: string
  apellido: string
  email: string
  avatar?: string
  activo: boolean
  ultimoAcceso?: string
  creado: string
}

// Datos de ejemplo para usuarios
export const usuariosData: Usuario[] = [
  {
    id: "user-1",
    nombre: "Admin",
    apellido: "Sistema",
    email: "admin@athplasticos.com",
    avatar: "/abstract-geometric-shapes.png",
    activo: true,
    ultimoAcceso: "2023-05-15T08:30:00Z",
    creado: "2023-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@athplasticos.com",
    avatar: "/abstract-color-run.png",
    activo: true,
    ultimoAcceso: "2023-05-14T16:45:00Z",
    creado: "2023-01-02T00:00:00Z",
  },
  {
    id: "user-3",
    nombre: "Ana",
    apellido: "Martínez",
    email: "ana.martinez@athplasticos.com",
    avatar: "/abstract-geometric-cm.png",
    activo: true,
    ultimoAcceso: "2023-05-15T09:15:00Z",
    creado: "2023-01-03T00:00:00Z",
  },
  {
    id: "user-4",
    nombre: "Luis",
    apellido: "Sánchez",
    email: "luis.sanchez@athplasticos.com",
    avatar: "/abstract-ls.png",
    activo: true,
    ultimoAcceso: "2023-05-13T14:20:00Z",
    creado: "2023-01-04T00:00:00Z",
  },
  {
    id: "user-5",
    nombre: "María",
    apellido: "López",
    email: "maria.lopez@athplasticos.com",
    avatar: "/abstract-am.png",
    activo: true,
    ultimoAcceso: "2023-05-15T10:05:00Z",
    creado: "2023-01-05T00:00:00Z",
  },
  {
    id: "user-6",
    nombre: "Roberto",
    apellido: "Gómez",
    email: "roberto.gomez@athplasticos.com",
    activo: false,
    creado: "2023-01-06T00:00:00Z",
  },
]

// Funciones para obtener datos
export function getUsuarios(): Usuario[] {
  return usuariosData
}

export function getUsuarioById(id: string): Usuario | undefined {
  return usuariosData.find((usuario) => usuario.id === id)
}

// Añadir la función getUsuarioByEmail
export function getUsuarioByEmail(email: string): Usuario | undefined {
  return usuariosData.find((usuario) => usuario.email === email)
}

export function getUsuariosActivos(): Usuario[] {
  return usuariosData.filter((usuario) => usuario.activo)
}

export function getUsuarioConRoles(id: string) {
  const usuario = getUsuarioById(id)
  if (!usuario) return undefined

  const roles = getRolesByUsuarioId(id)

  return {
    ...usuario,
    roles,
  }
}

// Funciones para crear, actualizar y eliminar usuarios
export function createUsuario(usuario: Omit<Usuario, "id" | "creado">): Usuario {
  const newUsuario: Usuario = {
    ...usuario,
    id: `user-${Date.now()}`,
    creado: new Date().toISOString(),
  }

  usuariosData.push(newUsuario)
  return newUsuario
}

export function updateUsuario(id: string, usuario: Partial<Omit<Usuario, "id" | "creado">>): Usuario | undefined {
  const index = usuariosData.findIndex((u) => u.id === id)
  if (index === -1) return undefined

  const updatedUsuario: Usuario = {
    ...usuariosData[index],
    ...usuario,
  }

  usuariosData[index] = updatedUsuario
  return updatedUsuario
}

export function deleteUsuario(id: string): boolean {
  const initialLength = usuariosData.length
  const newUsuarios = usuariosData.filter((usuario) => usuario.id !== id)

  if (newUsuarios.length === initialLength) return false

  usuariosData.length = 0
  usuariosData.push(...newUsuarios)

  return true
}

// Funciones para filtrar usuarios
export function getUsuariosByRol(rolId: string): Usuario[] {
  // Importamos la función desde roles.ts para evitar dependencias circulares
  const { getUsuariosByRolId } = require("./roles")
  const usuariosIds = getUsuariosByRolId(rolId)

  return usuariosData.filter((usuario) => usuariosIds.includes(usuario.id))
}
