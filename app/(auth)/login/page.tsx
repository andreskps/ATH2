import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sección izquierda - Imagen/Banner */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
        <Image
          src="/industrial-injection-molding.png"
          alt="ATH Fabricación de Plásticos"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-8">
          <h1 className="text-4xl font-bold mb-4">ATH</h1>
          <p className="text-xl font-medium mb-6">Fabricación de Plásticos</p>
          <p className="text-center max-w-md">
            Sistema integral de gestión para la industria de fabricación de plásticos. Optimice sus procesos y mejore su
            productividad.
          </p>
        </div>
      </div>

      {/* Sección derecha - Formulario de login */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
        <div className="w-full max-w-md mb-8">
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-3xl font-bold text-primary">ATH</h1>
            <p className="text-lg text-muted-foreground">Fabricación de Plásticos</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
