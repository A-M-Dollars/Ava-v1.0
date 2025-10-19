import React from 'react'


const StaffLogin = () => {
  return (
    <div className='place-items-center mt-4'>
      <div>
        {/* image here */}
        <div className='h-[300px] mb-2'>
          <img src="/auth/doc2.jpeg" alt="##"
            className='w-full h-full object-cover rounded-sm'
          />
        </div>
        {/*personal info form here  */}
        <div>
          <form action="#">
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <h1 className='text-[14px]'>Name</h1>
              </div>
              <div className='grid grid-cols-2 gap-2 '>
                <div className=''>
                  <input type="text" name='First Name' placeholder='First Name'
                    className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                    focus:outline-0 p-2'
                  />
                </div>
                <div>
                  <input type="text" name='Last Name' placeholder='Last Name'
                    className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                    focus:outline-0 p-2'
                  />
                </div>
              </div>
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <h1 className='text-[14px]'>Affiliated Institution</h1>
              </div>
              <input type="text" name='institution' placeholder='Name of institution you work for'
                className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                focus:outline-0 p-2'
              />
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <h1 className='text-[14px]'>Occupation/Position Served</h1>
              </div>
              <input type="text" name='occupation' placeholder='e.g. General Practitioner'
                className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                focus:outline-0 p-2'
              />
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <div className='mb-2 mt-2 ml-1'>
                  <h1 className='text-[14px]'>Work ID</h1>
                </div>
                <input type="text" name='id' placeholder='Your work ID'
                  className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                  focus:outline-0 p-2'
                />
              </div>
              <div>
                <div className='mb-2 mt-2 ml-1'>
                  <h1 className='text-[14px]'>Work Email</h1>
                </div>
                <input type="text" name='email' placeholder='Your work email'
                  className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                  focus:outline-0 p-2
                  '
                />
              </div>
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <p className='text-[12px] text-red-600 font-regular'>
                  Note: An authentication code will be sent to your work email for verification                </p>
              </div>
              <button
                className='bg-black text-white text-[14px] font-light h-[50px] w-full cursor-pointer'
              >Get Authentication Code</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffLogin