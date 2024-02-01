"use client"
import { login } from '../actions'
import { useFormStatus } from 'react-dom'

export default function LoginPage() {
  const { pending } = useFormStatus()

  return (
    <div className='flex justify-center p-7'>
    <form className='flex flex-col items-start gap-2'>
      <label htmlFor="email">Email:</label>
      <input className="shadow border rounded"id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className="shadow border rounded" id="password" name="password" type="password" required />
      <button className="bg-slate-200 p-1 rounded cursor-pointer" type="submit" disabled={pending} formAction={login}>
      {pending && <span>Logging...</span>}
      {!pending && <span>Log in</span>}
  </button>
    </form>
    </div>
  )
}