import Image from 'next/image'
import { Inter } from 'next/font/google'
import SignInWithGoogle from '@/components/Core/AuthLayout/SignInWithGoogle/SignInWithGoogle'
import NewGoogleSignIN from '@/components/Core/AuthLayout/NewGoogleSignIN/NewGoogleSignIN'
import New2GoogleSignIN from '@/components/Core/AuthLayout/New2GoogleSignIN/New2GoogleSignIN'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
   


   <div className='h-screen  w-screen flex justify-center items-center'>

   {/* <SignInWithGoogle/> */}

   {/* <NewGoogleSignIN/> */}
   <New2GoogleSignIN/>


   </div>
   
   
   </>
  )
}
