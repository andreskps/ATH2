import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const actividades = [
  {
    id: 1,
    usuario: "Carlos Méndez",
    avatar: "/abstract-geometric-cm.png",
    accion: "creó una nueva orden",
    tiempo: "hace 2 minutos",
  },
  {
    id: 2,
    usuario: "Laura Sánchez",
    avatar: "/abstract-ls.png",
    accion: "actualizó el inventario",
    tiempo: "hace 15 minutos",
  },
  {
    id: 3,
    usuario: "Miguel Ángel",
    avatar: "/Massachusetts-State-Map.png",
    accion: "agregó un nuevo cliente",
    tiempo: "hace 1 hora",
  },
  {
    id: 4,
    usuario: "Ana Martínez",
    avatar: "/abstract-am.png",
    accion: "completó una orden",
    tiempo: "hace 3 horas",
  },
  {
    id: 5,
    usuario: "Roberto Gómez",
    avatar: "/abstract-geometric-shapes.png",
    accion: "actualizó un producto",
    tiempo: "hace 5 horas",
  },
]

export function RecentesActividad() {
  return (
    <div className="space-y-8">
      {actividades.map((actividad) => (
        <div className="flex items-center" key={actividad.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={actividad.avatar || "/placeholder.svg"} alt={actividad.usuario} />
            <AvatarFallback>
              {actividad.usuario
                ? actividad.usuario
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{actividad.usuario}</p>
            <p className="text-sm text-muted-foreground">{actividad.accion}</p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">{actividad.tiempo}</div>
        </div>
      ))}
    </div>
  )
}
