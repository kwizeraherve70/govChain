import React, { useEffect ,useState} from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from '../skeletors/tableSkeletor';
import { GetAllProfileThunk } from '@/Redux/action/GetAllProfile';
import DropdownMenu from '../DropDown';
import { IoMdMore } from 'react-icons/io';


// Columns Definition
const columns = [
  { field: 'ProfileId', headerName: 'Profile ID', width: 230 },
  { field: 'Fullname', headerName: 'Full name', width: 200 },
  { field: 'DateOfBirthday', headerName: 'Birthday', width: 120 },
  { field: 'Gender', headerName: 'Gender', width:100 },
  { field: 'NationalId', headerName: 'NationalId', width: 180 },
  { field: 'Phone', headerName: 'Phone', width: 150 },
  { field: 'ProgramsJoined', 
    headerName: 'Program Joined', 
    width: 120, 
    renderCell: (params)=> params.row.ProgramsJoined.length },
    { field: 'Address', 
        headerName: 'Address', 
        width: 400, 
        renderCell: (params)=>
             (`${params.row.Address.Province}
                / 
                ${params.row.Address.District}
                /
                ${params.row.Address.Sector}
                /
                ${params.row.Address.Cell}
            ` )
        },
  {
    field: 'Role',
    headerName: 'Role',
    width: 150,
    renderCell: (params) => {
      const statusColors = {
        HIGH_OFFICIAL: 'green',
        LOCAL_LEADER: 'orange',
        CITIZEN: 'red',
      };
      return (
        <Box
          component="span"
          sx={{
            color: statusColors[Object.keys(params.row.Role)],
            fontWeight: 'bold',
          }}
        >
          {Object.keys(params.row.Role)}
        </Box>
      );
    },
  },
  { field: 'CreatedAt', headerName: 'Joined', width: 100 },
  {
    field: "Action",
    headerName: "Action",
    renderCell: (params) => {
      const [dropdownPosition, setDropdownPosition] = useState(null);
  
      const handleDropdownOpen = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom, left: rect.left });
      };
  
      return (
        <div>
          <button
            onClick={handleDropdownOpen}
            className="flex items-center justify-center w-8 h-8 focus:outline-none"
          >
            <IoMdMore className="w-5 h-5" />
          </button>
          {dropdownPosition && <DropdownMenu position={dropdownPosition} ProfileId={params.row.ProfileId}/>}
        </div>
      );
    },
    width: 50,
  }
  
];

const AllProfileTable = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(GetAllProfileThunk())
  },[dispatch])
  const { loading, GetAllProfile, error } = useSelector((state)=>state.AllProfile)
  return (
    <div className="col-span-full">

<Box sx={{ height: 400, width: '100%', backgroundColor: 'white', p: 2, boxShadow: 2 }}>
      <h2>Transaction Table</h2>
      {loading?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (GetAllProfile?.length  === 0|| error)?(
    <div style={{textAlign: "center"}}>
          <p>No Profile or there is error! Reload</p>
    </div>
  ):(
    <DataGrid
    getRowId={(row)=>(row.ProfileId)}
    rows={GetAllProfile}
    columns={columns}
    slots={{
      toolbar: GridToolbar,
    }}
    sx={{
      backgroundColor: '#f5f5f5', 
      '& .MuiDataGrid-row': {
        backgroundColor: '#ffffff', 
        '&:nth-of-type(odd)': {
          backgroundColor: '#f9f9f9',
        },
      },
      boxShadow: '0 4px 10px rgba(200, 200, 200, 0.7)',
      borderRadius: '8px',
      border: '1px solid #ddd',
    }}
  />
      
      )} 
    </Box>
    </div>
  );
};

export default AllProfileTable;
