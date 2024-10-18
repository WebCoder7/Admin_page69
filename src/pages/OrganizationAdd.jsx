import { ArrowLeftOutlined, LoadingOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect'
import { useAxios } from '../hooks/useAxios'
import toast, { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'

function OrganizationAdd() {
  const dateFormat = 'YYYY-MM-DD';
  const navigate = useNavigate()
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const statusData = [
    {
      value: "1",
      label: "Faol",
    },
    {
      value: "2",
      label: "Faol emas",
    },
    {
      value: "3",
      label: "Jarayonda",
    },
  ]


  const regionsData = [
    {
      value: "1",
      label: "Toshkent viloyati",
    },
    {
      value: "2",
      label: "Farg'ona viloyati",
    },
    {
      value: "3",
      label: "Xorazm viloyati",
    },
    {
      value: "4",
      label: "Andijon viloyati",
    },
  ]

  const [companyName, setCompanyName] = useState(null)
  const [inn, setInn] = useState(null)
  const [statusId, setStatusId] = useState(null)
  const [statusName, setStatusName] = useState(null)
  const [regionId, setRegionId] = useState(null)
  const [regionName, setRegionName] = useState(null)
  const [address, setAddress] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)


  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      key: Math.round(Math.random() * 100),
      companyName, inn,
      status: statusId,
      regionId: regionId,
      regionName: regionName,
      address: address,
      createdAt: createdAt
    }
    if (id) {
      useAxios().put(`/organization/${id}`, data).then(res => {
        toast.success("Tashkilot tahrirlandi")
        setTimeout(() => {
          navigate("/")
          setIsLoading(false)
        }, 800)
      })
    }
    else {
      useAxios().post("/organization", data).then(res => {
        toast.success("Tashkilot qo'shildi")
        setTimeout(() => {
          navigate("/")
          setIsLoading(false)
        }, 800)
      })
    }
  }

  const handleChangePicker = (date, dateString) => {
    setCreatedAt(dateString)
  };


  useEffect(() => {
    if (id) {
      useAxios().get(`/organization/${id}`).then(res => {
        setCompanyName(res.data.companyName)
        setInn(res.data.inn)
        setStatusId(res.data.status)
        setRegionName(res.data.regionName)
        setRegionId(res.data.regionId)
        setAddress(res.data.address)
        if (res.data.createdAt.includes(".")) {
          setCreatedAt(res.data.createdAt.split(".").reverse().join("-"))
        }
        else {
          setCreatedAt(res.data.createdAt)
        }
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className='p-5'>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <button type='button' onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className='scale-[1.5]' />
          </button>
          <h2 className='font-bold text-[25px]'>Tashkilot yaratish</h2>
        </div>
        <Button htmlType='submit' icon={isLoading ? <LoadingOutlined /> : <UserAddOutlined />} size='large' type='primary' >Saqlash</Button>
      </div>
      <div className='w-[70%] mt-10 flex justify-between'>
        <div className='w-[49%] space-y-5'>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>Tashkilot nomini kiriting</span>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type='text' placeholder='Tashkilot nomini kiriting' required allowClear size='large' />
          </label>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>INN kiriting</span>
            <Input maxLength={9} value={inn} onChange={(e) => setInn(e.target.value)} type='number' placeholder='INN kiriting' required allowClear size='large' />
          </label>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>Holat turini tanlang</span>
            <CustomSelect chooseId={statusId} setLabelValue={setStatusName} options={statusData} placeholder={"Holat turini tanlang"} setChooseId={setStatusId} width={"100%"} />
          </label>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>Hududni tanlang</span>
            <CustomSelect chooseId={regionId} setLabelValue={setRegionName} options={regionsData} placeholder={"Hududni tanlang"} setChooseId={setRegionId} width={"100%"} />
          </label>
        </div>
        <div className='w-[49%] space-y-5'>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>Manzil kiriting</span>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Manzil kiriting' required allowClear size='large' />
          </label>
          <label className='flex flex-col space-y-1'>
            <span className='text-slate-600 text-[16px]'>Vaqt kiriting</span>
            <DatePicker value={createdAt ? dayjs(createdAt, dateFormat) : dayjs()} onChange={handleChangePicker} size='large' required />
          </label>
        </div>
      </div>
    </form>
  )
}

export default OrganizationAdd