import { memo } from 'react'
import loaderSvg from '@/assets/Loader.svg'

const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <img src={loaderSvg} alt="loading" className="h-40 w-40 animate-spin [animation-duration:2.5s]" />
  </div>
)

export default memo(Loader) 