import Image from 'next/image'

type Props = {
  artUrl: string
  album: string
  artist: string
  name: string
  id: string
  onClick: (type: string) => void
  selected?: boolean
}

export const SelectAlbumCard = ({
  artUrl,
  album,
  artist,
  name,
  id,
  onClick,
  selected = false,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={
        'flex cursor-pointer flex-col items-center p-2 ' +
        (selected
          ? 'rounded-md border-2 border-green-500'
          : 'border-2 border-transparent')
      }
    >
      <Image src={artUrl} width={200} height={200} alt="Album image" />
      <p className="text-lg">{name}</p>
      <p className="text-sm">{artist}</p>
    </div>
  )
}
