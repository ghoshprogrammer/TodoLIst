import { useEffect, useState } from 'react'
import './App.css'
import { AiOutlinePlus } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";


function App() {

  const [inputVal, setInputVal] = useState("")
  const [item, setItem] = useState([])
  const [toggleBtn, setToggleBtn] = useState(true)
  const [editId, setEditId] = useState(null)


  const addItem = () => {

    if (!inputVal) {
      alert("Please filled something input box")
    }

    else if (inputVal && !toggleBtn) {
      setItem(item.map((ele) => {
        if (ele.id === editId) {
          return ({ name: inputVal })



        }
        return ele
      }))
      setInputVal('')
      setToggleBtn(!toggleBtn)
      setEditId(null)
    }

    else {
      const inputData = {
        id: new Date().getTime(), name: inputVal
      }
      setItem([...item, inputData])
      setInputVal('')
     
    }

  }

  const deleteItem = (id) => {
    let newItems = item.filter((val) => {
      return val.id !== id
    })

    setItem(newItems)
  }

  const updateItem = (id) => {
    let newdata = item.find((curEle) => {
      return curEle.id === id
    })
    setInputVal(newdata.name)
    setToggleBtn(!toggleBtn)
    setEditId(id)


  }

  const allClear=()=>{
     setItem([])
  }

  return (
    <>
      <div className="w-full h-screen bg-indigo-950 flex items-center justify-center ">
        <div className="lg:w-[50%] xl:w-[40%] w-[90%] p-8 flex items-center justify-center flex-col  bg-[#fff]">
          <form className='flex md:w-[70%] w-[100%] justify-center border-2 border-sky-500'>
            <input type="text" placeholder='Enter Data' className='sm:w-[400px] w-[100%] p-2  outline-0' value={inputVal} onChange={(event) => setInputVal(event.target.value)} />
            {toggleBtn ? <AiOutlinePlus className='text-3xl font-semibold pt-2' onClick={() => addItem()} /> : <CiEdit className='text-3xl font-semibold pt-2' onClick={() => addItem()} />}
          </form>
          <div className="main w-[100%] flex justify-center items-center flex-col">
            {
              item && item.map((curItem) => (
                <div className=' flex md:w-[70%] w-[100%] mt-4 p-3 justify-between items-center bg-sky-500'>
                  <h2 className='text-white text-xl'>{curItem.name}</h2>
                  <div className='flex '>  <CiEdit className='mr-2 text-2xl text-pink-800' onClick={() => updateItem(curItem.id)} /> <RiDeleteBin6Line className='text-2xl text-red-900' onClick={() => deleteItem(curItem.id)} /></div>
                </div>
              ))
            }

          </div>
          <button className='mt-5 bg-sky-700 w-[70%] rounded-full py-3 px-3 text-white' onClick={()=>allClear() }>Remove All</button>
        </div>
      </div>
    </>
  )
}

export default App
