// Tipos para roles y permisos
export interface Permiso {
  id: string
  nombre: string
  descripcion: string
  modulo: string
  accion: "ver" | "crear" | "editar" | "eliminar" | "exportar"
}

export interface Rol {
  id: string
  nombre: string
  descripcion: string
  permisos: string[] // IDs de permisos
  creado: string
  actualizado: string
}

export interface UsuarioRol {
  usuarioId: string
  rolId: string
  asignadoEn: string
}

// Datos de ejemplo para permisos
export const permisosPorModulo: Record<string, Permiso[]> = {
  empleados: [
    {
      id: "emp-ver",
      nombre: "Ver empleados",
      descripcion: "Permite ver la lista de empleados",
      modulo: "empleados",
      accion: "ver",
    },
    {
      id: "emp-crear",
      nombre: "Crear empleados",
      descripcion: "Permite crear nuevos empleados",
      modulo: "empleados",
      accion: "crear",
    },
    {
      id: "emp-editar",
      nombre: "Editar empleados",
      descripcion: "Permite editar empleados existentes",
      modulo: "empleados",
      accion: "editar",
    },
    {
      id: "emp-eliminar",
      nombre: "Eliminar empleados",
      descripcion: "Permite eliminar empleados",
      modulo: "empleados",
      accion: "eliminar",
    },
    {
      id: "emp-exportar",
      nombre: "Exportar empleados",
      descripcion: "Permite exportar datos de empleados",
      modulo: "empleados",
      accion: "exportar",
    },
  ],
  clientes: [
    {
      id: "cli-ver",
      nombre: "Ver clientes",
      descripcion: "Permite ver la lista de clientes",
      modulo: "clientes",
      accion: "ver",
    },
    {
      id: "cli-crear",
      nombre: "Crear clientes",
      descripcion: "Permite crear nuevos clientes",
      modulo: "clientes",
      accion: "crear",
    },
    {
      id: "cli-editar",
      nombre: "Editar clientes",
      descripcion: "Permite editar clientes existentes",
      modulo: "clientes",
      accion: "editar",
    },
    {
      id: "cli-eliminar",
      nombre: "Eliminar clientes",
      descripcion: "Permite eliminar clientes",
      modulo: "clientes",
      accion: "eliminar",
    },
    {
      id: "cli-exportar",
      nombre: "Exportar clientes",
      descripcion: "Permite exportar datos de clientes",
      modulo: "clientes",
      accion: "exportar",
    },
  ],
  productos: [
    {
      id: "prod-ver",
      nombre: "Ver productos",
      descripcion: "Permite ver la lista de productos",
      modulo: "productos",
      accion: "ver",
    },
    {
      id: "prod-crear",
      nombre: "Crear productos",
      descripcion: "Permite crear nuevos productos",
      modulo: "productos",
      accion: "crear",
    },
    {
      id: "prod-editar",
      nombre: "Editar productos",
      descripcion: "Permite editar productos existentes",
      modulo: "productos",
      accion: "editar",
    },
    {
      id: "prod-eliminar",
      nombre: "Eliminar productos",
      descripcion: "Permite eliminar productos",
      modulo: "productos",
      accion: "eliminar",
    },
    {
      id: "prod-exportar",
      nombre: "Exportar productos",
      descripcion: "Permite exportar datos de productos",
      modulo: "productos",
      accion: "exportar",
    },
  ],
  moldes: [
    {
      id: "mol-ver",
      nombre: "Ver moldes",
      descripcion: "Permite ver la lista de moldes",
      modulo: "moldes",
      accion: "ver",
    },
    {
      id: "mol-crear",
      nombre: "Crear moldes",
      descripcion: "Permite crear nuevos moldes",
      modulo: "moldes",
      accion: "crear",
    },
    {
      id: "mol-editar",
      nombre: "Editar moldes",
      descripcion: "Permite editar moldes existentes",
      modulo: "moldes",
      accion: "editar",
    },
    {
      id: "mol-eliminar",
      nombre: "Eliminar moldes",
      descripcion: "Permite eliminar moldes",
      modulo: "moldes",
      accion: "eliminar",
    },
    {
      id: "mol-exportar",
      nombre: "Exportar moldes",
      descripcion: "Permite exportar datos de moldes",
      modulo: "moldes",
      accion: "exportar",
    },
  ],
  maquinaria: [
    {
      id: "maq-ver",
      nombre: "Ver maquinaria",
      descripcion: "Permite ver la lista de maquinaria",
      modulo: "maquinaria",
      accion: "ver",
    },
    {
      id: "maq-crear",
      nombre: "Crear maquinaria",
      descripcion: "Permite crear nueva maquinaria",
      modulo: "maquinaria",
      accion: "crear",
    },
    {
      id: "maq-editar",
      nombre: "Editar maquinaria",
      descripcion: "Permite editar maquinaria existente",
      modulo: "maquinaria",
      accion: "editar",
    },
    {
      id: "maq-eliminar",
      nombre: "Eliminar maquinaria",
      descripcion: "Permite eliminar maquinaria",
      modulo: "maquinaria",
      accion: "eliminar",
    },
    {
      id: "maq-exportar",
      nombre: "Exportar maquinaria",
      descripcion: "Permite exportar datos de maquinaria",
      modulo: "maquinaria",
      accion: "exportar",
    },
  ],
  "materia-prima": [
    {
      id: "mp-ver",
      nombre: "Ver materia prima",
      descripcion: "Permite ver la lista de materia prima",
      modulo: "materia-prima",
      accion: "ver",
    },
    {
      id: "mp-crear",
      nombre: "Crear materia prima",
      descripcion: "Permite crear nueva materia prima",
      modulo: "materia-prima",
      accion: "crear",
    },
    {
      id: "mp-editar",
      nombre: "Editar materia prima",
      descripcion: "Permite editar materia prima existente",
      modulo: "materia-prima",
      accion: "editar",
    },
    {
      id: "mp-eliminar",
      nombre: "Eliminar materia prima",
      descripcion: "Permite eliminar materia prima",
      modulo: "materia-prima",
      accion: "eliminar",
    },
    {
      id: "mp-exportar",
      nombre: "Exportar materia prima",
      descripcion: "Permite exportar datos de materia prima",
      modulo: "materia-prima",
      accion: "exportar",
    },
  ],
  proveedores: [
    {
      id: "prov-ver",
      nombre: "Ver proveedores",
      descripcion: "Permite ver la lista de proveedores",
      modulo: "proveedores",
      accion: "ver",
    },
    {
      id: "prov-crear",
      nombre: "Crear proveedores",
      descripcion: "Permite crear nuevos proveedores",
      modulo: "proveedores",
      accion: "crear",
    },
    {
      id: "prov-editar",
      nombre: "Editar proveedores",
      descripcion: "Permite editar proveedores existentes",
      modulo: "proveedores",
      accion: "editar",
    },
    {
      id: "prov-eliminar",
      nombre: "Eliminar proveedores",
      descripcion: "Permite eliminar proveedores",
      modulo: "proveedores",
      accion: "eliminar",
    },
    {
      id: "prov-exportar",
      nombre: "Exportar proveedores",
      descripcion: "Permite exportar datos de proveedores",
      modulo: "proveedores",
      accion: "exportar",
    },
  ],
  ordenes: [
    {
      id: "ord-ver",
      nombre: "Ver órdenes",
      descripcion: "Permite ver la lista de órdenes",
      modulo: "ordenes",
      accion: "ver",
    },
    {
      id: "ord-crear",
      nombre: "Crear órdenes",
      descripcion: "Permite crear nuevas órdenes",
      modulo: "ordenes",
      accion: "crear",
    },
    {
      id: "ord-editar",
      nombre: "Editar órdenes",
      descripcion: "Permite editar órdenes existentes",
      modulo: "ordenes",
      accion: "editar",
    },
    {
      id: "ord-eliminar",
      nombre: "Eliminar órdenes",
      descripcion: "Permite eliminar órdenes",
      modulo: "ordenes",
      accion: "eliminar",
    },
    {
      id: "ord-exportar",
      nombre: "Exportar órdenes",
      descripcion: "Permite exportar datos de órdenes",
      modulo: "ordenes",
      accion: "exportar",
    },
  ],
  programacion: [
    {
      id: "prog-ver",
      nombre: "Ver programación",
      descripcion: "Permite ver la programación",
      modulo: "programacion",
      accion: "ver",
    },
    {
      id: "prog-crear",
      nombre: "Crear programación",
      descripcion: "Permite crear nueva programación",
      modulo: "programacion",
      accion: "crear",
    },
    {
      id: "prog-editar",
      nombre: "Editar programación",
      descripcion: "Permite editar programación existente",
      modulo: "programacion",
      accion: "editar",
    },
    {
      id: "prog-eliminar",
      nombre: "Eliminar programación",
      descripcion: "Permite eliminar programación",
      modulo: "programacion",
      accion: "eliminar",
    },
    {
      id: "prog-exportar",
      nombre: "Exportar programación",
      descripcion: "Permite exportar datos de programación",
      modulo: "programacion",
      accion: "exportar",
    },
  ],
  turnos: [
    {
      id: "turn-ver",
      nombre: "Ver turnos",
      descripcion: "Permite ver la lista de turnos",
      modulo: "turnos",
      accion: "ver",
    },
    {
      id: "turn-crear",
      nombre: "Crear turnos",
      descripcion: "Permite crear nuevos turnos",
      modulo: "turnos",
      accion: "crear",
    },
    {
      id: "turn-editar",
      nombre: "Editar turnos",
      descripcion: "Permite editar turnos existentes",
      modulo: "turnos",
      accion: "editar",
    },
    {
      id: "turn-eliminar",
      nombre: "Eliminar turnos",
      descripcion: "Permite eliminar turnos",
      modulo: "turnos",
      accion: "eliminar",
    },
    {
      id: "turn-exportar",
      nombre: "Exportar turnos",
      descripcion: "Permite exportar datos de turnos",
      modulo: "turnos",
      accion: "exportar",
    },
  ],
  supervision: [
    {
      id: "sup-ver",
      nombre: "Ver supervisión",
      descripcion: "Permite ver la supervisión",
      modulo: "supervision",
      accion: "ver",
    },
    {
      id: "sup-crear",
      nombre: "Crear supervisión",
      descripcion: "Permite crear nueva supervisión",
      modulo: "supervision",
      accion: "crear",
    },
    {
      id: "sup-editar",
      nombre: "Editar supervisión",
      descripcion: "Permite editar supervisión existente",
      modulo: "supervision",
      accion: "editar",
    },
    {
      id: "sup-eliminar",
      nombre: "Eliminar supervisión",
      descripcion: "Permite eliminar supervisión",
      modulo: "supervision",
      accion: "eliminar",
    },
    {
      id: "sup-exportar",
      nombre: "Exportar supervisión",
      descripcion: "Permite exportar datos de supervisión",
      modulo: "supervision",
      accion: "exportar",
    },
  ],
  inventario: [
    {
      id: "inv-ver",
      nombre: "Ver inventario",
      descripcion: "Permite ver el inventario",
      modulo: "inventario",
      accion: "ver",
    },
    {
      id: "inv-crear",
      nombre: "Crear inventario",
      descripcion: "Permite crear nuevo inventario",
      modulo: "inventario",
      accion: "crear",
    },
    {
      id: "inv-editar",
      nombre: "Editar inventario",
      descripcion: "Permite editar inventario existente",
      modulo: "inventario",
      accion: "editar",
    },
    {
      id: "inv-eliminar",
      nombre: "Eliminar inventario",
      descripcion: "Permite eliminar inventario",
      modulo: "inventario",
      accion: "eliminar",
    },
    {
      id: "inv-exportar",
      nombre: "Exportar inventario",
      descripcion: "Permite exportar datos de inventario",
      modulo: "inventario",
      accion: "exportar",
    },
  ],
  reportes: [
    { id: "rep-ver", nombre: "Ver reportes", descripcion: "Permite ver reportes", modulo: "reportes", accion: "ver" },
    {
      id: "rep-crear",
      nombre: "Crear reportes",
      descripcion: "Permite crear nuevos reportes",
      modulo: "reportes",
      accion: "crear",
    },
    {
      id: "rep-exportar",
      nombre: "Exportar reportes",
      descripcion: "Permite exportar reportes",
      modulo: "reportes",
      accion: "exportar",
    },
  ],
  admin: [
    {
      id: "admin-roles",
      nombre: "Gestionar roles",
      descripcion: "Permite gestionar roles y permisos",
      modulo: "admin",
      accion: "ver",
    },
    {
      id: "admin-usuarios",
      nombre: "Gestionar usuarios",
      descripcion: "Permite gestionar usuarios y sus roles",
      modulo: "admin",
      accion: "ver",
    },
    {
      id: "admin-config",
      nombre: "Configuración del sistema",
      descripcion: "Permite modificar la configuración del sistema",
      modulo: "admin",
      accion: "ver",
    },
  ],
}

// Datos de ejemplo para roles
export const rolesData: Rol[] = [
  {
    id: "admin",
    nombre: "Administrador",
    descripcion: "Acceso completo a todas las funcionalidades del sistema",
    permisos: Object.values(permisosPorModulo).flatMap((permisos) => permisos.map((p) => p.id)),
    creado: "2023-01-01T00:00:00Z",
    actualizado: "2023-01-01T00:00:00Z",
  },
  {
    id: "supervisor",
    nombre: "Supervisor",
    descripcion: "Acceso a supervisión y gestión de producción",
    permisos: [
      "emp-ver",
      "prod-ver",
      "mol-ver",
      "maq-ver",
      "mp-ver",
      "ord-ver",
      "prog-ver",
      "prog-crear",
      "prog-editar",
      "turn-ver",
      "turn-crear",
      "turn-editar",
      "sup-ver",
      "sup-crear",
      "sup-editar",
      "sup-exportar",
      "inv-ver",
      "rep-ver",
    ],
    creado: "2023-01-02T00:00:00Z",
    actualizado: "2023-01-02T00:00:00Z",
  },
  {
    id: "operador",
    nombre: "Operador",
    descripcion: "Acceso limitado a operaciones de producción",
    permisos: ["prod-ver", "mol-ver", "maq-ver", "ord-ver", "prog-ver", "turn-ver", "sup-ver", "sup-crear"],
    creado: "2023-01-03T00:00:00Z",
    actualizado: "2023-01-03T00:00:00Z",
  },
  {
    id: "ventas",
    nombre: "Ventas",
    descripcion: "Acceso a clientes y órdenes",
    permisos: [
      "cli-ver",
      "cli-crear",
      "cli-editar",
      "prod-ver",
      "ord-ver",
      "ord-crear",
      "ord-editar",
      "inv-ver",
      "rep-ver",
    ],
    creado: "2023-01-04T00:00:00Z",
    actualizado: "2023-01-04T00:00:00Z",
  },
  {
    id: "almacen",
    nombre: "Almacén",
    descripcion: "Gestión de inventario y materia prima",
    permisos: [
      "prod-ver",
      "mp-ver",
      "mp-crear",
      "mp-editar",
      "prov-ver",
      "inv-ver",
      "inv-crear",
      "inv-editar",
      "inv-exportar",
    ],
    creado: "2023-01-05T00:00:00Z",
    actualizado: "2023-01-05T00:00:00Z",
  },
]

// Datos de ejemplo para asignación de roles a usuarios
export const usuariosRolesData: UsuarioRol[] = [
  { usuarioId: "user-1", rolId: "admin", asignadoEn: "2023-01-01T00:00:00Z" },
  { usuarioId: "user-2", rolId: "supervisor", asignadoEn: "2023-01-02T00:00:00Z" },
  { usuarioId: "user-3", rolId: "operador", asignadoEn: "2023-01-03T00:00:00Z" },
  { usuarioId: "user-4", rolId: "ventas", asignadoEn: "2023-01-04T00:00:00Z" },
  { usuarioId: "user-5", rolId: "almacen", asignadoEn: "2023-01-05T00:00:00Z" },
  { usuarioId: "user-6", rolId: "supervisor", asignadoEn: "2023-01-06T00:00:00Z" },
]

// Funciones para obtener datos
export function getRoles(): Rol[] {
  return rolesData
}

export function getRolById(id: string): Rol | undefined {
  return rolesData.find((rol) => rol.id === id)
}

export function getPermisos(): Permiso[] {
  return Object.values(permisosPorModulo).flat()
}

export function getPermisosPorModulo(): Record<string, Permiso[]> {
  return permisosPorModulo
}

export function getModulos(): string[] {
  return Object.keys(permisosPorModulo)
}

export function getUsuariosRoles(): UsuarioRol[] {
  return usuariosRolesData
}

export function getRolesByUsuarioId(usuarioId: string): Rol[] {
  const rolesIds = usuariosRolesData.filter((ur) => ur.usuarioId === usuarioId).map((ur) => ur.rolId)

  return rolesData.filter((rol) => rolesIds.includes(rol.id))
}

export function getUsuariosByRolId(rolId: string): string[] {
  return usuariosRolesData.filter((ur) => ur.rolId === rolId).map((ur) => ur.usuarioId)
}

// Funciones para crear, actualizar y eliminar roles
export function createRol(rol: Omit<Rol, "id" | "creado" | "actualizado">): Rol {
  const newRol: Rol = {
    ...rol,
    id: `rol-${Date.now()}`,
    creado: new Date().toISOString(),
    actualizado: new Date().toISOString(),
  }

  rolesData.push(newRol)
  return newRol
}

export function updateRol(id: string, rol: Partial<Omit<Rol, "id" | "creado" | "actualizado">>): Rol | undefined {
  const index = rolesData.findIndex((r) => r.id === id)
  if (index === -1) return undefined

  const updatedRol: Rol = {
    ...rolesData[index],
    ...rol,
    actualizado: new Date().toISOString(),
  }

  rolesData[index] = updatedRol
  return updatedRol
}

export function deleteRol(id: string): boolean {
  const initialLength = rolesData.length
  const newRoles = rolesData.filter((rol) => rol.id !== id)

  if (newRoles.length === initialLength) return false

  // También eliminamos las asignaciones de este rol a usuarios
  const newUsuariosRoles = usuariosRolesData.filter((ur) => ur.rolId !== id)

  // Actualizamos los arrays
  rolesData.length = 0
  rolesData.push(...newRoles)

  usuariosRolesData.length = 0
  usuariosRolesData.push(...newUsuariosRoles)

  return true
}

// Funciones para asignar y desasignar roles a usuarios
export function asignarRolAUsuario(usuarioId: string, rolId: string): UsuarioRol {
  // Verificamos si ya existe esta asignación
  const existente = usuariosRolesData.find((ur) => ur.usuarioId === usuarioId && ur.rolId === rolId)
  if (existente) return existente

  const nuevaAsignacion: UsuarioRol = {
    usuarioId,
    rolId,
    asignadoEn: new Date().toISOString(),
  }

  usuariosRolesData.push(nuevaAsignacion)
  return nuevaAsignacion
}

export function desasignarRolDeUsuario(usuarioId: string, rolId: string): boolean {
  const initialLength = usuariosRolesData.length
  const newUsuariosRoles = usuariosRolesData.filter((ur) => !(ur.usuarioId === usuarioId && ur.rolId === rolId))

  if (newUsuariosRoles.length === initialLength) return false

  usuariosRolesData.length = 0
  usuariosRolesData.push(...newUsuariosRoles)

  return true
}

// Añadir estas funciones al final del archivo para gestionar permisos

// Función para crear un nuevo permiso
export function createPermiso(permiso: Omit<Permiso, "id">): Permiso {
  const newPermiso: Permiso = {
    ...permiso,
    id: `${permiso.modulo}-${permiso.accion}-${Date.now()}`,
  }

  // Añadir el permiso al módulo correspondiente
  if (!permisosPorModulo[permiso.modulo]) {
    permisosPorModulo[permiso.modulo] = []
  }

  permisosPorModulo[permiso.modulo].push(newPermiso)
  return newPermiso
}

// Función para actualizar un permiso existente
export function updatePermiso(id: string, permiso: Partial<Omit<Permiso, "id">>): Permiso | undefined {
  // Buscar el permiso en todos los módulos
  for (const modulo of Object.keys(permisosPorModulo)) {
    const index = permisosPorModulo[modulo].findIndex((p) => p.id === id)
    if (index !== -1) {
      // Si el módulo cambia, mover el permiso al nuevo módulo
      if (permiso.modulo && permiso.modulo !== modulo) {
        // Eliminar del módulo actual
        const permisoActual = permisosPorModulo[modulo][index]
        permisosPorModulo[modulo].splice(index, 1)

        // Crear en el nuevo módulo
        if (!permisosPorModulo[permiso.modulo]) {
          permisosPorModulo[permiso.modulo] = []
        }

        const updatedPermiso: Permiso = {
          ...permisoActual,
          ...permiso,
        }

        permisosPorModulo[permiso.modulo].push(updatedPermiso)
        return updatedPermiso
      } else {
        // Actualizar en el mismo módulo
        const updatedPermiso: Permiso = {
          ...permisosPorModulo[modulo][index],
          ...permiso,
        }

        permisosPorModulo[modulo][index] = updatedPermiso
        return updatedPermiso
      }
    }
  }

  return undefined
}

// Función para eliminar un permiso
export function deletePermiso(id: string): boolean {
  for (const modulo of Object.keys(permisosPorModulo)) {
    const initialLength = permisosPorModulo[modulo].length
    permisosPorModulo[modulo] = permisosPorModulo[modulo].filter((p) => p.id !== id)

    if (permisosPorModulo[modulo].length < initialLength) {
      // También eliminamos este permiso de todos los roles que lo tengan
      for (const rol of rolesData) {
        rol.permisos = rol.permisos.filter((p) => p !== id)
      }
      return true
    }
  }

  return false
}

// Función para obtener un permiso por su ID
export function getPermisoById(id: string): Permiso | undefined {
  for (const modulo of Object.keys(permisosPorModulo)) {
    const permiso = permisosPorModulo[modulo].find((p) => p.id === id)
    if (permiso) return permiso
  }

  return undefined
}
