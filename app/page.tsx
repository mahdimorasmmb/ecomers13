import ListProducts from '@/components/products/ListProducts'
import axios from 'axios'
import Image from 'next/image'


const getProducts =async () => {
   const {data} = await axios.get(`${process.env.API_URL}/api/products`)

   return data
}

export default async function Home() {

  const productsData = await getProducts()

  return (
    <main >
     <ListProducts data={productsData}/>
     <h1>moeas</h1>
    </main>
  )
}
