import { FC, useState } from 'react'
import { CenterLayout } from '../layouts/center'

type Props = {
  steps: number
  children: React.ReactNode[]
}

export const Stepper: FC<Props> = ({ steps, children }) => {
  const [step, setStep] = useState(0)
  return (
    <div className="flex h-full w-full flex-col items-center">
      {children[step]}
      <div className="flex w-full justify-between px-12 text-white">
        <button
          className="rounded bg-purple-500 py-2 px-3 hover:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className="rounded bg-blue-500 py-2 px-3 hover:bg-purple-400 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
          onClick={() => setStep((s) => s + 1)}
          disabled={step === steps - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}
