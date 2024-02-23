import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const inputForm = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(18),
})

type Inputs = z.infer<typeof inputForm>

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(inputForm) })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    console.log(errors)
  }

  return (
    <section className="grid md:grid-cols-2 place-content-center min-h-screen gap-10 md:gap-0">
      <div className="flex items-center flex-col justify-center">
        <h2 className=" text-[4ch] md:text-[5ch] font-semibold tracking-wide">Inicio de sesión</h2>
        <p className="">Un gusto tenerte de nuevo por aquí.</p>
      </div>
      <form method="post" className="md:w-[70%] flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          Correo Electrónico
          <input type="email" id="email" placeholder="ejemplo@ejemplo.com" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('email')} />
        </label>
        <label className="flex flex-col">
          Contraseña
          <input type="password" id="password" placeholder="*********" className="p-2 border rounded-xl  outline-none bg-transparent" {...register('password')} />
        </label>
        <button className="rounded-lg bg-primary py-2 mt-2" type="submit">
          Iniciar sesión
        </button>
        <p>
          No tienes una cuenta?{' '}
          <a href="/register" className="underline text-lighter">
            registrate aquí.
          </a>
        </p>
      </form>
    </section>
  )
}

export default Login
