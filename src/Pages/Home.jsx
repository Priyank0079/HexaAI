import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select';
import { BsStars } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import Editor, { loader } from '@monaco-editor/react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { TiExport } from "react-icons/ti";
import { ImNewTab } from "react-icons/im";
import { IoMdRefresh } from "react-icons/io";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { IoMdCloseCircleOutline } from "react-icons/io";



const Home = () => {

  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + TAILWIND CSS' },
    { value: 'html-bootstrap', label: 'HTML + BOOTSTRAP' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + TAILWIND CSS + BOOTSTRAP' },
  ];

  const [outputScreen, setOutputScreen] = useState(false)
  const [tab, setTab] = useState(1)
  const [prompt, setPrompt] = useState("")
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false);
  const [isNewTabopen, setIsNewTabOpen] = useState(false)
 


  

  const free = () => {
  window.location.reload();
};
    
  


  // if we use this so code come in normal format

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({ apiKey: " AIzaSyBRUtcVySWp7Knx51nUHJr4aJ_pXCNeKrk " });



  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
    You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
•	The code must be clean, well-structured, and easy to understand.  
•	Optimize for SEO where applicable.  
•	Focus on creating a modern, animated, and responsive UI design.  
•	Include high-quality hover effects, shadows, animations, colors, and typography.  
•	Return ONLY the code, formatted properly in *Markdown fenced code blocks*.  
•	Do NOT include explanations, text, comments, or anything else besides the code.  
•	And give the whole code in a single HTML file.
    
    
    `,
    });
    console.log(response.text);

    setOutputScreen(true);
    setCode(extractCode(response.text));
    setLoading(false)
  }

  const copyCode = async () => {


    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard ")
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy")
    }


  };



  const downloadFile = () => {
    const filename = 'HEXAUI- Code.html'
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File Downloaded")
  };





  return (
    <>
      <Navbar />
      <div className="flex items-center p-[20px] justify-between gap-[50px]">

        <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px]">

          <h3 className='text-[26px] font-bold sp-text'>AI COMPONENT GENERATOR</h3>
          <p className='text-[gray] mt-2 text-[16px] '>Describe your component here and AI will code for you </p>


          <p className='text-[14px] font-[700] mt-4'>FRAMEWORK</p>
          <Select className='mt-2'
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000",
                borderColor: "#333",
                color: "#fff",
                padding: "4px",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000",
                color: "#fff",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#222"
                  : state.isFocused
                    ? "#333"
                    : "#000",
                color: "#fff",
                cursor: "pointer",
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#fff",
                "&:hover": { color: "#bbb" },
              }),

              indicatorSeparator: (base) => ({ ...base, backgroundColor: "#444" }),
            }}
            placeholder="Select option"
            onChange={(e) => {
              setFramework(e.value)

            }}
          />

          <p className='text-[14px] font-[700] mt-6'>DESCRIBE YOUR COMPONENT</p>

          <textarea onChange={(e) => { setPrompt(e.target.value) }} value={prompt} className='w-full min-h-[150px] bg-[#09090B] mt-2 rounded-xl  p-2.5 text-gray-400' placeholder="Describe your prompt in detail so it help me a lot"></textarea>

          <div className="flex items-center justify-between">
            <p className='text-gray-600'>Click on generate button to generate your code  <FaArrowAltCircleRight />


            </p>
            <button onClick={getResponse} className='generate flex items-center p-[5px] rounded-lg border-0 cursor-pointer bg-gradient-to-r from-blue-500  to-pink-500 mt-2  px-[20px] gap-[10px] transition-all hover:opacity-[.3]' > <i><BsStars />
            </i>

              {

                loader === true ?
                  <>
                    <ClipLoader className='text-[30px]' />
                  </> : ""
              }


              Generate</button>
          </div>

        </div>




        <div className="right relative w-[50%] h-[80vh]  bg-[#141319] mt-5 rounded-xl">

          {
            outputScreen === false ?
              <>





                <div className="skeleton w-full h-full flex items-center flex-col justify-center">

                  <div className="circle p-[20px]  flex items-center justify-center text-[25px] w-[70px] h-[70px] rounded-[50%]  bg-gradient-to-r from-blue-500  to-pink-500 "><FaCode />
                  </div>
                  <p className='text-[16px] text-gray-500 mt-2'>Your component and code will appear here</p>
                </div>
              </> : <>
                {/* //for code editor */}

                <div className="top rounded-xl bg-[#17171C] w-full h-[60px] flex items-center gap-[15px]  px-[20px]">

                  <button onClick={() => { setTab(1) }} className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 1 ? "bg-[#333]" : ""}`}>Code</button>
                  <button onClick={() => setTab(2)} className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 2 ? "bg-[#333]" : ""}`}>Preview</button>




                </div>

                <div className="top-2  rounded-xl bg-[#17171C] w-full h-[60px] flex items-center justify-between gap-[15px]  px-[20px]">
                  <div className="left">
                    <p className='font-bold'>Code Editor</p>
                  </div>

                  <div className="right flex items-center gap-[10px]">




                    {

                      tab === 1 ?
                        <>
                          <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={copyCode} >  <FaRegCopy /></button>
                          <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={downloadFile}>  <TiExport /></button>
                        </> :

                        <>
                          <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={() => { setIsNewTabOpen(true) }}> <ImNewTab />
                          </button>
                          <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333] " onClick={free} > <IoMdRefresh />
                          </button>

                        </>
                    }

                  </div>


                </div>





                <div className="editor  h-full">


                  {
                    tab === 1 ?
                      <>
                        <Editor value={code} height="100%" language="html" theme='vs-dark' />

                      </> :
                      <>
                        <iframe srcDoc={code} className="preview1 w-full h-full bg-white text-black flex items-center justify-center"></iframe>
                      </>


                  }



                </div>
              </>
          }





        </div>

      </div>
      {
        isNewTabopen === true ? (
          <div className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-screen overflow-auto">

            <div className='top w-full h-[60px] flex items-center justify-between px-[20px]'>

              <div className="left">
                <p className='font-bold text-gray-600'>Preview</p>
              </div>

              <div className="right flex items-center gap-[10px]">
                <button
                  className='copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800  text-gray-600 flex items-center justify-center transition-all hover:bg-[#333]'
                  onClick={() => { setIsNewTabOpen(false); }}
                >
                  <IoMdCloseCircleOutline />
                </button>
              </div>
            </div>

            <iframe srcDoc={code} className="w-full h-full"></iframe>

          </div>
        ) : null
      }

    </>
  )
}

export default Home
