import { DeleteOutlined, EditOutlined, LineOutlined, MedicineBoxOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Popover } from 'antd'
import  { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../components/CustomTable'
import { useAxios } from '../hooks/useAxios'

function CapitalUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)


  const columns = [
    {
      title: 'ID',
      dataIndex: 'index'
    },
    {
      title: 'Ismi',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Telefon raqami',
      dataIndex: 'number'
    },
    {
      title: 'Kasbi',
      dataIndex: 'job'
    },
    {
      title: 'Holati',
      dataIndex: 'status'
    },
    {
      title: 'Manzil',
      dataIndex: 'address'
    },
    {
      title: 'Batafsil',
      dataIndex: 'action'
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });

  // SearchPart start
  function handleSeachChange(e) {
    setIsLoading(true)
    if (e.target.value) {
      const filteredUser = users.filter(item => item.name ? item.name.toLowerCase().includes(e.target.value.toLowerCase()) : "")
      setTimeout(() => {
        setUsers(filteredUser)
        setIsLoading(false)
      }, 1000)
    }
    else {
      setTimeout(() => {
        setRefresh(!refresh)
      }, 1000)
    }
  }
  // SearchPart end
  // Delete part start
  const [deleteId, setDeleteId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  function handleDeleteOrganization(id) {
    setDeleteModal(true)
    setDeleteId(id)
  }

  function handleSureDeleteOrganization() {
    useAxios().delete(`/users/${deleteId}`).then(res => {
      setDeleteModal(false)
      setIsLoading(true)
      setTimeout(() => {
        setRefresh(!refresh)
        toast.success("Muvaffaqiyatli o'chirildi")
      }, 1000)
    })
  }

  // Delete part end

  useEffect(() => {
    useAxios().get(`/users`).then(res => {
      setIsLoading(false)
      setUsers(res.data.map((item, index) => {
        item.index = index + 1
        item.address = <Popover placement="top" content={item.address}><p className='text-ellipsis whitespace-nowrap overflow-hidden inline-block cursor-pointer w-[200px]'>{item.address}</p></Popover>
        item.email = item.email ? item.email : <LineOutlined />
        item.status = item.status ? "faol" : "faol emas"
        item.action = <div className='flex items-center gap-10'>
          <MoreOutlined onClick={() => navigate(`${item.id}`)} className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
          <EditOutlined onClick={() => navigate(`${item.id}/edit`)} className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
          <DeleteOutlined onClick={() => handleDeleteOrganization(item.id)} className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
        </div>
        return item
      }))
    })
  }, [refresh])

  function handlePaginationChange(page) {
    setTableParams({
        pagination:page
    })
}


  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-bold text-[25px]'>Poytaxt foydalanuvchilari</h2>
          <span className='text-[15px] pl-1 text-slate-400'>foydalanuvchilar({users.length})</span>
        </div>
        <Button onClick={() => navigate("add")} icon={<MedicineBoxOutlined />} size='large' type='primary' >Qo'shish</Button>
      </div>
      <div className='flex mt-5 items-center space-x-5'>
        <Input onChange={handleSeachChange} className='w-[350px]' size='large' type='text' allowClear placeholder='Qidirish...' />
      </div>
      <div className='mt-5'>
        <CustomTable tableParams={tableParams} onChange={handlePaginationChange} columns={columns} data={users} isLoading={isLoading} />
      </div>
      <Modal title="Foydalanuvchini o'chirmoqchimisiz?" open={deleteModal} onOk={handleSureDeleteOrganization} onCancel={() => setDeleteModal(false)} ></Modal>
    </div>
  )
}

export default CapitalUsers