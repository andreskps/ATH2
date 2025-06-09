import type { Empleado } from "@/lib/types"

// Datos de ejemplo para empleados
const empleadosData: Empleado[] = [
  {
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez Gómez",
    cedula: "12345678",
    fechaNacimiento: "1985-03-15",
    cargo: "Operador de Máquina",
    departamento: "Producción",
    estado: "Activo",
    celular: "3001234567",
    direccion: "Calle 123 # 45-67, Barrio Centro, Ciudad",
    email: "juan.perez@athplasticos.com",
    telefono: "6011234567",
    foto: "/stylized-jp-initials.png",
    turno: "Mañana",
    tipoContrato: "Indefinido",
    tallaCamiseta: "L",
    tallaPantalon: "34",
    tallaCalzado: "42",
    tallaChaqueta: "L",
  },
  {
    id: 2,
    nombre: "María",
    apellidos: "López Rodríguez",
    cedula: "87654321",
    fechaNacimiento: "1990-06-10",
    cargo: "Supervisor de Calidad",
    departamento: "Calidad",
    estado: "Activo",
    celular: "3009876543",
    direccion: "Avenida 45 # 12-34, Barrio Norte, Ciudad",
    email: "maria.lopez@athplasticos.com",
    foto: "/machine-learning-concept.png",
    turno: "Tarde",
    tallaCamiseta: "M",
    tallaPantalon: "30",
    tallaCalzado: "38",
    tallaChaqueta: "M",
  },
  {
    id: 3,
    nombre: "Roberto",
    apellidos: "García Martínez",
    cedula: "23456789",
    fechaNacimiento: "1982-01-22",
    cargo: "Técnico de Mantenimiento",
    departamento: "Mantenimiento",
    estado: "Inactivo",
    celular: "3002345678",
    direccion: "Carrera 67 # 89-12, Barrio Sur, Ciudad",
    telefono: "6012345678",
    foto: "/abstract-geometric-shapes.png",
    tipoContrato: "Temporal",
    tallaCamiseta: "XL",
    tallaPantalon: "36",
    tallaCalzado: "43",
    tallaChaqueta: "XL",
  },
  {
    id: 4,
    nombre: "Ana",
    apellidos: "Martínez Pérez",
    cedula: "34567890",
    fechaNacimiento: "1988-11-05",
    cargo: "Gerente de Ventas",
    departamento: "Ventas",
    estado: "Activo",
    celular: "3003456789",
    direccion: "Diagonal 78 # 23-45, Barrio Oeste, Ciudad",
    email: "ana.martinez@athplasticos.com",
    telefono: "6013456789",
    foto: "/abstract-am.png",
    turno: "Rotativo",
    tipoContrato: "Indefinido",
    tallaCamiseta: "S",
    tallaPantalon: "28",
    tallaCalzado: "37",
    tallaChaqueta: "S",
  },
  {
    id: 5,
    nombre: "Carlos",
    apellidos: "Rodríguez López",
    cedula: "45678901",
    fechaNacimiento: "1995-07-30",
    cargo: "Operador de Máquina",
    departamento: "Producción",
    estado: "Activo",
    celular: "3004567890",
    direccion: "Calle 34 # 56-78, Barrio Este, Ciudad",
    foto: "/abstract-color-run.png",
    turno: "Noche",
    tipoContrato: "Temporal",
    tallaCamiseta: "M",
    tallaPantalon: "32",
    tallaCalzado: "41",
    tallaChaqueta: "M",
  },
]

// Función para obtener todos los empleados
export function getEmpleados(): Empleado[] {
  return empleadosData
}

// Función para obtener un empleado por su ID
export function getEmpleadoById(id: number): Empleado | undefined {
  return empleadosData.find((empleado) => empleado.id === id)
}

// Función para obtener empleados por rol o cargo
export function getEmpleadosByRol(rol: string): Empleado[] {
  return empleadosData.filter(
    (empleado) =>
      empleado.cargo === rol ||
      empleado.departamento === rol ||
      (rol === "Operario" && empleado.cargo === "Operador de Máquina"),
  )
}

// Función para verificar si una cédula ya existe
export function cedulaExists(cedula: string, excludeId?: number): boolean {
  return empleadosData.some(
    (empleado) => empleado.cedula === cedula && (excludeId === undefined || empleado.id !== excludeId),
  )
}

// Función para crear un nuevo empleado
export function createEmpleado(empleado: Omit<Empleado, "id">): Empleado {
  const newId = Math.max(...empleadosData.map((e) => e.id)) + 1
  const newEmpleado = { ...empleado, id: newId } as Empleado
  empleadosData.push(newEmpleado)
  return newEmpleado
}

// Función para actualizar un empleado existente
export function updateEmpleado(id: number, empleado: Partial<Empleado>): Empleado | undefined {
  const index = empleadosData.findIndex((e) => e.id === id)
  if (index === -1) return undefined

  empleadosData[index] = { ...empleadosData[index], ...empleado }
  return empleadosData[index]
}

// Función para eliminar un empleado
export function deleteEmpleado(id: number): boolean {
  const index = empleadosData.findIndex((e) => e.id === id)
  if (index === -1) return false

  empleadosData.splice(index, 1)
  return true
}
