import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const inputsFormRegister = z.object({
  name: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(18),
})

type InputsRegister = z.infer<typeof inputsFormRegister>

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsRegister>({ resolver: zodResolver(inputsFormRegister) })

  const onSubmit: SubmitHandler<InputsRegister> = (data) => {
    console.log(data)
  }

  return (
    <section className="grid md:grid-cols-2 place-content-center min-h-screen gap-10 md:gap-0">
      <div className="flex items-center flex-col justify-center">
        <h2 className=" text-[4ch] md:text-[5ch] font-semibold tracking-wide">Regístrate</h2>
        <p className="">Es un placer que quieras ser parte de nosotros.</p>
      </div>
      <form method="post" className="md:w-[70%] flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          Nombre
          <input type="text" id="name" placeholder="Pepito" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('name')} />
        </label>
        <label className="flex flex-col">
          Apellido
          <input type="text" id="lastName" placeholder="Estrada" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('lastName')} />
        </label>
        <label className="flex flex-col">
          Correo Electrónico
          <input type="email" id="email" placeholder="ejemplo@ejemplo.com" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('email')} />
        </label>
        <label className="flex flex-col">
          Contraseña
          <input type="password" id="password" placeholder="*********" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('password')} />
        </label>
        <button className="rounded-lg bg-primary py-2 mt-2" type="submit">
          Regístrate
        </button>
        <p>
          Ya tienes una cuenta?{' '}
          <a href="/login" className="underline text-lighter">
            Inicia sesión.
          </a>
        </p>
      </form>
    </section>
  )
}

export default RegisterComponent
