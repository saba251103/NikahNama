import './App.css';
import TextField from '@mui/material/TextField';
import { Card} from '@mui/material';
import { Box } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Import the Realtime Database module
import React, { useState, useRef } from 'react'; // Import useRef from React
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Backup() {
const firebaseConfig = {
  apiKey: "AIzaSyAWgTRyr3O4fZ52fMHc5-qjQnzuXr3nZc4",
  authDomain: "nikah-nama-303f8.firebaseapp.com",
  databaseURL: "https://nikah-nama-303f8-default-rtdb.firebaseio.com",
  projectId: "nikah-nama-303f8",
  storageBucket: "nikah-nama-303f8.appspot.com",
  messagingSenderId: "165401747600",
  appId: "1:165401747600:web:528963fd5d12f7531d7815"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const certificateRef = useRef(null);

  const [srNo, setSrNo] = useState('');
  const [registerNo, setRegisterNo] = useState('');
  const [date, setDate] = useState('');
  const [placenikah,setPlaceNikah]= useState('');
  const [datenikah,setDateNikah]= useState('');
  const [islamicdate,setIslamicDate]= useState('');
  const [namegroom,setNameGroom]= useState('');
  const [addressgroom,setAddressGroom]= useState('');
  const [dateofbirthg,setDobG] = useState('');
  const [namebride,setNameBride]= useState('');
  const [addressbride,setAddressBride]= useState('');
  const [dateofbirthb,setDobB] = useState('');
  const [vali,setVali]= useState('');
  const [vakil,setVakil]= useState('');
  const [witness1,setWitness1]=useState('');
  const [witness2,setWitness2]=useState('');
  const [meher,setMeher]=useState('');

  const handleSaveData = () => {
    // Save data to Firebase Realtime Database
    firebase.database().ref('marriageCertificates').push({
      srNo: srNo,
      registerNo: registerNo,
      date: date,
      placenikah: placenikah,
      datenikah: datenikah,
      islamicdate: islamicdate,
      namegroom: namegroom,
      addressgroom: addressgroom,
      dateofbirthg: dateofbirthg,
      namebride: namebride,
      addressbride: addressbride,
      dateofbirthb: dateofbirthb,
      vali: vali,
      vakil: vakil,
      witness1: witness1,
      witness2: witness2,
      meher: meher

    }).then(() => {
      console.log('Data saved successfully.');

      setSrNo('');
      setRegisterNo('');
      setDate('');
      setPlaceNikah('');
      setDateNikah('');
      setIslamicDate('');
      setNameGroom('');
      setAddressGroom('');
      setDobG('');
      setNameBride('');
      setAddressBride('');
      setDobB('');
      setVali('');
      setVakil('');
      setWitness1('');
      setWitness2('');
      setMeher('');
  
    }).catch((error) => {
      console.error('Error saving data:', error);
    });
  };
  const handleConvertToPDF = () => {

    const input = certificateRef.current;

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = 310;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('marriage_certificate.pdf');
    });
  };
  
  return (
    <>
      <div id ="certificate" ref={certificateRef} className="App">
        <h2>
          بسمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
        </h2>
        <h1>سجل النكاح</h1>
        <h1>Marriage Certificate</h1>
        <h2>النِّكَاحُ مِنْ سُنَّتِي فَمَنْ رَغِبَ عَنْ سُنَّتِي فَلَيْسَ مِنْى</h2>
        <h3>قاضی اشفاق احمد قاسم ٹھاکر، شافعی ، شریفی</h3>
        <h1>
          Qazi Ashfaque Ahmed Kasam Thakur Shafaee Sharifee</h1>
        <h3>
        BUILDING NO. 35, FLAT NO. 207, JAIJAYWANTI CHS LTD, NEHRU NAGAR, KURLA E, MUMBAI, PO:NEHRU NAGAR, DIST : MUMBAI SUBURBAN, MAHARASHTRA, 400024    
        </h3>
        <>
        <Card sx={{width:1250, height: 100, marginLeft:8}}>
          <TextField id="srno." label="SR NO." variant="outlined" value={srNo} onChange={(e) => setSrNo(e.target.value)} sx={{width: 350, marginRight: 5,marginTop: 3}} />
          <TextField id="registerno." label="Register No." variant="outlined" value={registerNo} onChange={(e) => setRegisterNo(e.target.value)} sx={{width: 350, marginRight: 5,marginTop: 3}} />
          <TextField id="date" label="Date (dd-mm-yyyy)" variant="outlined" value={date} onChange={(e) => setDate(e.target.value)} sx={{width: 350, marginRight: 5,marginTop: 3}} />
        </Card>
        <br></br>
        <Card sx={{ width: 1250, height: 200, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Place of Nikah</label>
          <TextField id="placenikah"  variant="outlined" value={placenikah} onChange={(e) => setPlaceNikah(e.target.value)} sx={{width: 950, marginRight: 5,marginTop: 3, marginLeft: 2}} />    <h3>
         مقام نکاح </h3>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4 }}>          
        <label >Date of Nikah</label>&nbsp;&nbsp; 
          <TextField id="datenikah"  value={datenikah} onChange={(e) => setDateNikah(e.target.value)}variant="outlined"  sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />    <h3>
          تاریخ نکاح </h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
        <label >Islamic Date :</label>
        <TextField id="islamicdate"  variant="outlined" value={islamicdate} onChange={(e) => setIslamicDate(e.target.value)} sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />    <h3>
        هجری تاریخ</h3>
        </Box>
        </Card>
        <br></br>
        <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Name of Groom</label>
          <TextField id="namegroom"  variant="outlined" value={namegroom} onChange={(e) => setNameGroom(e.target.value)} sx={{width: 950, marginRight: 5,marginTop: 3, marginLeft: 2}} />    <h3>
          دولہا کا نام</h3>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <TextField id="addressgroom"  variant="outlined"  value={addressgroom} onChange={(e) => setAddressGroom(e.target.value)}sx={{width: 950, marginRight: 5,marginTop: 3, marginLeft: 2}} />   <h3> 
          دولہا کا نام</h3>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4 }}>          
        <label >Date of Birth &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <TextField id="dateofbirthg"  variant="outlined" value={dateofbirthg} onChange={(e) => setDobG(e.target.value)} sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />    <h3>
          تاریخ پیدائش</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;     
          <label >Groom Sign &nbsp;&nbsp;&nbsp;</label>
        <TextField id="groomsign"  variant="outlined"  sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />    <h3>
        دستخط دولها</h3>
        </Box>
        </Card>
        <br></br>
        <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Name of Bride</label>
          <TextField id="namebride"  variant="outlined" value={namebride} onChange={(e) => setNameBride(e.target.value)} sx={{width: 950, marginRight: 5,marginTop: 3, marginLeft: 2}} />   <h3> 
          دولہن کا نام</h3>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <TextField id="addressbride" variant="outlined" value={addressbride} onChange={(e) => setAddressBride(e.target.value)} sx={{width: 950, marginRight: 5,marginTop: 3, marginLeft: 2}} /> <h3>   
          دولہا کا نام</h3>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4 }}>          
        <label >Date of Birth &nbsp; </label>
          <TextField id="dateofbirthb"  variant="outlined" value={dateofbirthb} onChange={(e) => setDobB(e.target.value)} sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />  <h3>  
          تاریخ پیدائش </h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label >Bride Sign &nbsp;&nbsp;&nbsp;</label>
        <TextField id="bridesign"  variant="outlined"  sx={{width: 350, marginRight: 2,marginTop: 3, marginLeft: 2}} />  <h3>  
        دستخط دلهن</h3>
        </Box>
        </Card>
<br></br>
<Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
    <label>Meher</label>
    <TextField
      id="meher"
      variant="outlined"
      value={meher}
      onChange={(e) => setMeher(e.target.value)}
      sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
    />
    <h3>مہر</h3>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }} >
  <br/>
  <label>Vali</label> &nbsp;&nbsp;&nbsp;&nbsp;
  <TextField
    id="vali"
    variant="outlined"
    value={vali}
    onChange={(e) => setVali(e.target.value)}
    sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
  />
  <label>Sign</label>
  <TextField
    id=""
    label=""
    variant="outlined"
    sx={{ width: 300, marginRight: 5, marginTop: 3, marginLeft: 2 }}
  />
  <h3>دستخط ولی</h3>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
    <label>Vakil</label> &nbsp;&nbsp;&nbsp;
    <TextField
      id="vakil"
      variant="outlined"
      value={vakil}
      onChange={(e) => setVakil(e.target.value)}
      sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
    />
    <label>Vakil Sign</label>
    <TextField
      id=""
      label=""
      variant="outlined"
      sx={{ width: 300, marginRight: 5, marginTop: 3, marginLeft: 2 }}
    />
    <h3>دستخط وکیل</h3>
  </Box>
</Card>

        <br></br>
        <Card sx={{ width: 1250, height: 200, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Witness (1)</label>
          <TextField id="witness1"  variant="outlined" value={witness1} onChange={(e) => setWitness1(e.target.value)} sx={{width: 500, marginRight: 5,marginTop: 3, marginLeft: 2}} />    
        <label>Sign &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <TextField id="" label="" variant="outlined"  sx={{width: 300, marginRight: 5,marginTop: 3, marginLeft: 2}} />   <h3>
        دستخط گواه (1)</h3> 
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Witness (2)</label>
          <TextField id="witness2"  variant="outlined" value={witness2} onChange={(e) => setWitness2(e.target.value)} sx={{width: 500, marginRight: 5,marginTop: 3, marginLeft: 2}} />    
        <label>Sign &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <TextField id="" label= " " variant="outlined"  sx={{width: 300, marginRight: 5,marginTop: 3, marginLeft: 2}} />  <h3>  
        دستخط گواه (2)</h3>
         </Box>
        </Card>
        <br></br>
        <Card sx={{ width: 1250, height: 200, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center',marginTop: 1,marginLeft: 4  }}>
        <label >Qazi Sign</label>
          <TextField id="" label="" variant="outlined"  sx={{width: 500, marginRight: 5,marginTop: 3, marginLeft: 2}} />    <h3>
          دستخط قاضی</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Stamp &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <TextField id="" label="" variant="outlined"  sx={{width: 300, marginRight: 3,marginTop: 3, marginLeft: 2}} />   <h3> مہر </h3> 
             </Box>
        <br/>
        <button onClick={handleSaveData}>Save Data</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleConvertToPDF}>Convert to PDF</button>

        </Card>
        </>
      </div>

    </>
  );
}


