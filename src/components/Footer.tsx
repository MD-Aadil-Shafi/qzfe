
const Footer = () => {
  return (
    <footer className='flex justify-center items-center flex-col px-10 bg-slate-100 py-4'>
        <p className='font-bold'>&copy; Quiz Online {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer