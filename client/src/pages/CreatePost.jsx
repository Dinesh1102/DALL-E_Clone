import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(form.prompt&&form.photo){
      setloading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method: 'post',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      }finally{
        setloading(false);
      }
    }else{
      alert('Enter a prompt and generate image');
    }
  }
  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSurpriseMe = ()=>{
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form,prompt:randomPrompt})
  }
  const generateImage = async ()=>{
    if(form.prompt){
      try {
        setgeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'Post',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt:form.prompt}),
        });
        const data = await response.json();
        setForm({...form,photo:`data:img/jpeg;base64,${data.photo}`});

      } catch (error) {
        alert(error);
      }finally{
        setgeneratingImg(false);
      }
    }else{
      alert('Enter a valid prompt')
    }
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222338] text-[32px]'>Create new post</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create collection of imaginative images using DALL-E AI</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} action="">
        <div className='flex flex-col gap-5'>
          <FormField labelName="Your Name" type="text" name="name" placeholder="Robert Downey" value={form.name} handleChange={handleChange}/>
          <FormField labelName="Prompt" type="text" name="name" placeholder="'an astronaut lounging in a tropical resort in space, vaporwave" value={form.prompt} handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe} />
          <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 relative flex justify-center items-center w-64 h-64 p-3'>
            {form.photo?(
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
            ):(
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-30' />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImage} className='text-white bg-[#2D4356] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg?'Generating image....':'Generate image'}
          </button>
        </div>
        <div className='mt-10 '>
              <p className='mt-2 text-[#666e75] text-[#14px]'>Share your work with the community </p>
              <button type='submit' className='mt-3 text-white bg-[#2D4356] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                {loading?'Sharing':'Share with community'}
              </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
