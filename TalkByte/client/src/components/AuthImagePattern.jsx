

const AuthImagePattern = ({title,subtitle}) => {
  return (
    <>
    <div className='hidden lg:flex items-center justify-center p-12'>
      <div className='text-center max-w-md'>
        <div className='grid grid-cols-3 gap-3 mb-8'>
          {[...Array(9)].map((_, index) =>{
            return (
              <div key={index} className={`aspect-square bg-gray-700/40 rounded-2xl ${index%2===0 ?"animate-pulse":""}`} />

            )
          } )}
        </div>
        <h1 className="text-black text-2xl font-bold mb-4">{title}</h1>
        <p className='text-black text-sm break-words'>{subtitle}</p>
      </div>
    </div>
    </>
  )
}

export default AuthImagePattern