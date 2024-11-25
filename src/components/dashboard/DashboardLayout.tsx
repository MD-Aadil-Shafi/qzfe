import DashboardCard from './DashboardCard';

const DashboardLayout = () => {
  return (
    <div className='p-10 min-h-[86vh]'>
      <h1 className='text-2xl mb-5'>My Dashboard</h1>
      <section className='flex gap-5 flex-wrap justify-center'>
        <DashboardCard title='Home' subtitle='View home section' href='/'/>
        <DashboardCard title='Browse All Quiz' subtitle='View & participate in quiz' href='/quiz'/>
        <DashboardCard title='Create Quiz' subtitle='Publish your own quiz' href='/create-quiz'/>
        <DashboardCard title='My Questions' subtitle='View and create questions' href='/my-question'/>
      </section>
    </div>
  )
}

export default DashboardLayout