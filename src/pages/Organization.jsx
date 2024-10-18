import { LineOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Popover } from 'antd'
import  { useEffect, useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import CustomTable from '../components/CustomTable'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Organization() {
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'index'
        },
        {
            title: 'Tashkilot nomi',
            dataIndex: 'companyName'
        },
        {
            title: 'INN',
            dataIndex: 'inn'
        },
        {
            title: 'Holati',
            dataIndex: 'status'
        },
        {
            title: 'Filial',
            dataIndex: 'regionName'
        },
        {
            title: 'Manzil',
            dataIndex: 'address'
        },
        {
            title: 'Yaratilgan vaqt',
            dataIndex: 'createdAt'
        },
        {
            title: 'Batafsil',
            dataIndex: 'action'
        },
    ];

    const [data, setData] = useState([]);

    const [regonId, setRegionId] = useState("")

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
            const filteredData = data.filter(item => item.companyName ? item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) : "")
            setTimeout(() => {
                setData(filteredData)
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
        useAxios().delete(`/organization/${deleteId}`).then(res => {
            setDeleteModal(false)
            setIsLoading(true)
            setTimeout(() => {
                setRefresh(!refresh)
                toast.success("Muvaffaqiyatli o'chirildi")
            }, 1000)
        })
    }



    const regionList = [
        {
            value: 1,
            label: "Toshkent shahar"
        },
        {
            value: 2,
            label: "Farg'ona viloyati"
        },
        {
            value: 3,
            label: "Xorazm viloyati"
        },
        {
            value: 4,
            label: "Andijon viloyati"
        },
    ]


    useEffect(() => {
        useAxios().get(`/organization?regionId=${regonId}`).then(res => {
            setIsLoading(false)
            setData(res.data.map((item, index) => {
                item.index = index + 1
                item.address = <Popover placement="top" content={item.address}><p className='text-ellipsis whitespace-nowrap overflow-hidden inline-block cursor-pointer w-[200px]'>{item.address}</p></Popover>
                item.inn = item.inn ? item.inn : <LineOutlined />
                switch (item.status) {
                    case "1":
                        item.status = "Faol"
                        break;
                    case "2":
                        item.status = "Faol emas";
                        break;
                    case "3":
                        item.status = "Jarayonda";
                        break;
                }
                item.action = <div className='flex items-center gap-10'>
                    <MoreOutlined onClick={() => navigate(`${item.id}`)} className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <EditOutlined onClick={() => navigate(`${item.id}/edit`)} className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <DeleteOutlined onClick={() => handleDeleteOrganization(item.id)} className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                </div>
                return item
            }))
        })
    }, [refresh, regonId])


    function handlePaginationChange(page) {
        setTableParams({
            pagination:page
        })
    }


    return (
        <div className='p-5'>
            <Toaster position="top-center" reverseOrder={false}/>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
                    <span className='text-[15px] pl-1 text-slate-400'>tashkilotlar({data.length})</span>
                </div>
                <Button onClick={() => navigate("add")} icon={<MedicineBoxOutlined />} size='large' type='primary' >Qo'shish</Button>
            </div>
            <div className='flex mt-5 items-center space-x-5'>
                <Input onChange={handleSeachChange} className='w-[350px]' size='large' type='text' allowClear placeholder='Qidirish...' />
                <CustomSelect chooseId={regonId} width={"350px"} setIsLoading={setIsLoading} placeholder={"Tanlash..."} setChooseId={setRegionId} options={regionList} />
            </div>
            <div className='mt-5'>
                <CustomTable tableParams={tableParams} onChange={handlePaginationChange} columns={columns} data={data} isLoading={isLoading} />
            </div>
            <Modal title="Tashkilotni o'chirmoqchimisiz?" open={deleteModal} onOk={handleSureDeleteOrganization} onCancel={() => setDeleteModal(false)} ></Modal>
        </div>
    )
}

export default Organization