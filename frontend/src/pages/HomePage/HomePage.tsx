import React from 'react'
import Hero from '../../components/Hero/Hero'

type Props = {}

const HomePage: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <Hero/>
    </div>
  )
}

export default HomePage