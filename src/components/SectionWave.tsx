type Props = {
  position?: 'top' | 'bottom'
  color?: string
}

export default function SectionWave({ position = 'bottom', color = '#ffffff' }: Props) {
  const isTop = position === 'top'
  return (
    <div aria-hidden className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block w-full h-[60px]"
        style={{ transform: isTop ? 'rotate(180deg)' : undefined }}
      >
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.2-168.06-16.17-250.45.39C406,33.88,321.39,68.9,240.35,92.83,163.57,115.37,82.89,128.14,0,120V0H1200V27.35C1121.46,66.24,1047.66,113.41,985.66,92.83Z" fill={color} />
      </svg>
    </div>
  )
}


