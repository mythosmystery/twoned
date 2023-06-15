import { ClockLoader } from 'react-spinners'

export const Loader = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <>
      <h1 className="text-4xl font-thin text-white">{text}</h1>
      <ClockLoader size={100} className="my-32" color="white" />
    </>
  )
}
