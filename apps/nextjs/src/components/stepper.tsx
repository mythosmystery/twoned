import { FC, useState } from 'react'
import { CenterLayout } from '../layouts/center'

type Props = {
  steps: number
  children: React.ReactNode[]
  onFinish?: () => void
}

export const Stepper: FC<Props> = ({ steps, children, onFinish }) => {
  const [step, setStep] = useState(0)

  const onNext = () => {
    if (step === steps - 1) onFinish && onFinish()
    else setStep((s) => s + 1)
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      {children[step]}
      <div className="flex w-full justify-between px-12 text-white">
        <button
          className="rounded-full bg-purple-500 py-3 px-4 hover:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className="rounded-full bg-blue-500 py-3 px-4 hover:bg-purple-400 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
          onClick={onNext}
          disabled={step === steps - 1 && !onFinish}
        >
          {step === steps - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
