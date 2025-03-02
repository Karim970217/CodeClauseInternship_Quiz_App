import React, { useRef, useState } from 'react'
import { data } from './data'
import './Quiz.css'

const Quiz = () => {
    const [index,setIndex]=useState(0)
    const [question,setQuestion]=useState(data[index])
    const [clicked,setClicked]=useState(false)
    const [score,setScore]=useState(0)
    const [result,setResult]=useState(false)
    
    const option1=useRef(null)
    const option2=useRef(null)
    const option3=useRef(null)
    const option4=useRef(null)

    const options=[option1,option2,option3,option4]

    const checkans=(e,ans)=>{
        if(clicked==false){
            if(ans===question.ans){
                e.target.classList.add("correct")
                setClicked(true)
                setScore(prev=>prev+1)
            }
            else{
                e.target.classList.add("wrong")
                setClicked(true)
                options[question.ans-1].current.classList.add('correct')
            }
        }
    }

    const reset=()=>{
        setIndex(0)
        setQuestion(data[0])
        setClicked(false)
        setScore(0)
        setResult(false)
    }

    const next=()=>{
        if(clicked===true){
            if(index===data.length-1){
                setResult(true)
                return 0
            }
            setIndex(prevIndex => prevIndex + 1);  
            setQuestion(data[index + 1]);  
            setClicked(false);
            options.map((option)=>{
                option.current.classList.remove('wrong')
                option.current.classList.remove('correct')
                return null
            })
        }
    }

  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col w-[80%] h-[90%] md:w-[60%] md:h-[80%] bg-[#6832a8] rounded-lg border-3 border-black-600'>
            <h1 className='text-[30px] flex justify-center text-white font-bold'>Quiz App</h1>
            {result?
            <>
            <h2 className='text-[30px] md:text-[40px] lg:text-[50px] m-[20px]'>Your score {score} out of {data.length} questions</h2>
            <button className='border-2 border-black-600 mx-[80px] md:mx-[150px] text-[30px] mt-[20px] rounded-lg bg-teal-200' onClick={reset}>Reset</button>
            </>:<><div className='text-[18px] md:text-[25px] font-semibold text-white ml-[20px] my-[15px] md:my-[20px]'>{index+1}. {question.question}</div>
            <ul>
                <li ref={option1} onClick={(e)=>{checkans(e,1)}} className='text-[15px] md:text-[18px] font-medium ml-[20px] border-2 border-black-600 mb-[20px] mr-[10px] p-[5px] rounded-lg cursor-pointer'>{question.option1}</li>
                <li ref={option2} onClick={(e)=>{checkans(e,2)}} className='text-[15px] md:text-[18px] font-medium ml-[20px] border-2 border-black-600 mb-[20px] mr-[10px] p-[5px] rounded-lg cursor-pointer'>{question.option2}</li>
                <li ref={option3} onClick={(e)=>{checkans(e,3)}} className='text-[15px] md:text-[18px] font-medium ml-[20px] border-2 border-black-600 mb-[20px] mr-[10px] p-[5px] rounded-lg cursor-pointer'>{question.option3}</li>
                <li ref={option4} onClick={(e)=>{checkans(e,4)}} className='text-[15px] md:text-[18px] font-medium ml-[20px] border-2 border-black-600 mb-[20px] mr-[10px] p-[5px] rounded-lg cursor-pointer'>{question.option4}</li>
            </ul>
            <button onClick={next} className='border border-black-600 text-black-500 mx-[100px] md:mx-[150px] p-[5px] bg-teal-200 rounded-lg my-[10px] cursor-pointer'>Next</button>
            <h2 className='mt-[20px] flex justify-center'>{index+1} out of {data.length} questions</h2></>}
        </div>
    </div>
  )
}

export default Quiz