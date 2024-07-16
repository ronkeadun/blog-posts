import { useState } from 'react'

const Success = ({msg}) => {

    const [show, setShow] = useState(true)

    setTimeout(()=> setShow(false), 5000)
    return (
        <div>
            {show && <div className="bg-green-500 text-white p-2 rounded-md mt-6 mb-4 text-sm">
                        <i className="fa-solid fa-circle-check"></i> {msg}
                    </div>}
        </div>
      )
}

export default Success
