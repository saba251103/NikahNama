import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, TextField } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Box } from '@mui/material';

export default function ViewDetails() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      const selectedCertificate = JSON.parse(localStorage.getItem('selectedCertificate'));
      if (selectedCertificate && selectedCertificate.srNo === id) {
        setCertificate(selectedCertificate);
      } else {
        fetchCertificateFromFirebase(id);
      }
    };

    fetchCertificate();
  }, [id]);

  const fetchCertificateFromFirebase = async (id) => {
    try {
      const snapshot = await firebase.database().ref(`marriageCertificates/${id}`).once('value');
      if (snapshot.exists()) {
        const certificateData = snapshot.val();
        setCertificate(certificateData);
      } else {
        console.log('No data available for ID:', id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!certificate) {
    return <div>Loading...</div>;
  }

  // Debugging: Log the certificate object to inspect its structure
  console.log('Certificate Data:', certificate);

  return (
    <Card id="certificate" className="App">
      <h2>بسمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</h2>
      <h1>سجل النكاح</h1>
      <h1>Marriage Certificate</h1>
      <h2>النِّكَاحُ مِنْ سُنَّتِي فَمَنْ رَغِبَ عَنْ سُنَّتِي فَلَيْسَ مِنْى</h2>
      <h3>قاضی اشفاق احمد قاسم ٹھاکر، شافعی ، شریفی</h3>
      <h1>Qazi Ashfaque Ahmed Kasam Thakur Shafaee Sharifee</h1>
      <h3>BUILDING NO. 35, FLAT NO. 207, JAIJAYWANTI CHS LTD, NEHRU NAGAR, KURLA E, MUMBAI, PO:NEHRU NAGAR, DIST : MUMBAI SUBURBAN, MAHARASHTRA, 400024</h3>

      <Card sx={{ width: 1250, height: 100, marginLeft: 8 }}>
        <TextField
          id="srno."
          label="SR NO."
          variant="outlined"
          value={certificate.srNo || ''}
          disabled
          sx={{ width: 350, marginRight: 5, marginTop: 3 }}
        />
        <TextField
          id="registerno."
          label="Register No."
          variant="outlined"
          value={certificate.registerNo || ''}
          disabled
          sx={{ width: 350, marginRight: 5, marginTop: 3 }}
        />
        <TextField
          id="date"
          label="Date (dd-mm-yyyy)"
          variant="outlined"
          value={certificate.registrationDate || ''}
          disabled
          sx={{ width: 350, marginRight: 5, marginTop: 3 }}
        />
      </Card>

      <br />

      <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Place of Nikah</label>
          <TextField
            id="placenikah"
            variant="outlined"
            value={certificate.placeNikah || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>مقام نکاح</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Address</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="addressgroom"
            variant="outlined"
            value={certificate.addressGroom || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دولہا کا نام</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Date of Nikah</label>&nbsp;&nbsp;
          <TextField
            id="datenikah"
            variant="outlined"
            value={certificate.dateNikah || ''}
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2 }}
          />
          <h3>تاریخ نکاح</h3>&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Islamic Date :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="islamicdate"
            variant="outlined"
            value={certificate.islamicDate || ''}
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2}}
          />
          <h3>هجری تاریخ</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
      </Card>

      <br />

      <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Name of Groom</label>
          <TextField
            id="namegroom"
            variant="outlined"
            value={certificate.nameGroom || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دولہا کا نام</h3>&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Address</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="addressgroom"
            variant="outlined"
            value={certificate.addressGroom || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دولہا کا نام</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Date of Birth</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="dateofbirthg"
            variant="outlined"
            value={certificate.dateOfBirthg || ''}
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2 }}
          />
          <h3>تاریخ پیدائش</h3>&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Groom Sign</label>
          <TextField
            id="groomsign"
            variant="outlined"
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دستخط دولها</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
      </Card>

      <br />

      <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Name of Bride</label>
          <TextField
            id="namebride"
            variant="outlined"
            value={certificate.nameBride || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دولہن کا نام</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Address</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="addressbride"
            variant="outlined"
            value={certificate.addressBride || ''}
            disabled
            sx={{ width: 950, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دولہا کا نام</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Date of Birth</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="dateofbirthb"
            variant="outlined"
            value={certificate.dateOfBirthb || ''}
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2 }}
          />
          <h3>تاریخ پیدائش</h3>&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Bride Sign</label>
          <TextField
            id="bridesign"
            variant="outlined"
            disabled
            sx={{ width: 350, marginRight: 2, marginTop: 3, marginLeft: 2 }}
          />
          <h3>دستخط دلهن</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
      </Card>

      <br />

      <Card sx={{ width: 1250, height: 300, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Meher</label>
          <TextField
            id="meher"
            variant="outlined"
            value={certificate.meher || ''}
            disabled
            sx={{ width: 1050, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>مہر</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Vali</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="vali"
            variant="outlined"
            value={certificate.vali || ''}
            disabled
            sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>ولی</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Vakil</label>&nbsp;&nbsp;
          <TextField
            id="vakil"
            variant="outlined"
            value={certificate.vakil || ''}
            disabled
            sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>وکیل</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
      </Card>
      <br />
      <Card sx={{ width: 1250, height: 200, marginLeft: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Witness 1</label>
          <TextField
            id="witness1"
            variant="outlined"
            value={certificate.witness1 || ''}
            disabled
            sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>گواہ نمبر ۱</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginLeft: 4 }}>
          <label>Witness 2</label>
          <TextField
            id="witness2"
            variant="outlined"
            value={certificate.witness2 || ''}
            disabled
            sx={{ width: 550, marginRight: 5, marginTop: 3, marginLeft: 2 }}
          />
          <h3>گواہ نمبر ۲</h3>&nbsp;&nbsp;&nbsp;&nbsp;
        </Box>
      </Card>

      <br />
    </Card>
  );
}
