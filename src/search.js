import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import background from './background4.png';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));



const StyledBackgroundPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover , contain', // Define sizes for each background image
  backgroundPosition: 'center,bottom right', // Define positions for each background image
  padding: theme.spacing(2),
}));


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

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation
  
  const handleViewDetails = (certificate) => {
    // Store the selected certificate data in local storage (optional)
    localStorage.setItem('selectedCertificate', JSON.stringify(certificate));

    // Navigate to the ViewDetails page
    navigate(`/view/${certificate.srNo}`);
  };

  const handleSearch = () => {
    const searchRef = firebase.database().ref('marriageCertificates');
    let query;
    if (/\d+/.test(searchTerm)) {
      query = searchRef.orderByChild('srNo').equalTo(searchTerm);
    } 
    else if(/\d+/.test(searchTerm)){
      query = searchRef.orderByChild('registerNo').equalTo(searchTerm);
    }
    else {
      query = searchRef.orderByChild('namebride').startAt(searchTerm).endAt(searchTerm + '\uf8ff');
     
    }

  
    query.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const results = Object.values(data).map((certificate) => ({
          srNo: certificate.srNo,
          registerNo: certificate.registerNo,
          nameBride: certificate.namebride,
          nameGroom: certificate.namegroom,
          registrationDate: certificate.date,
          placeNikah: certificate.placenikah,
          islamicDate: certificate.islamicdate,
          dateNikah: certificate.datenikah, 
          addressGroom: certificate.addressgroom,
          addressBride: certificate.addressbride,
          dateOfBirthg:certificate.dateofbirthg,
          dateOfBirthb: certificate.dateofbirthb,
          vali: certificate.vali ,
          vakil: certificate.vakil ,
          witness1: certificate.witness1 ,
          witness2 : certificate.witness2,
          meher: certificate.meher ,
        }));
        setSearchResults(results);
      } else {
        alert("Not Found!!");
        setSearchResults([]);
      }
    });
  };
  



  
  return (
    <>
      <StyledBackgroundPaper>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </StyledBackgroundPaper>
      <br />

      <Typography variant="h4" gutterBottom>Nikah Nama Search</Typography>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            id="search-nikah"
            label="Search by SR No., Bride Name or Registeration no."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); }}} // Search on Enter key down
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      {searchResults.length > 0 && (
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {searchResults.map((result) => (
              <StyledPaper key={result.srNo}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar sx={{ backgroundColor: '#ccc' }}>
                      <Typography variant="body2">
                        {result.nameBride.charAt(0).toUpperCase() + result.nameGroom.charAt(0).toUpperCase()}
                      </Typography>
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">{result.nameBride} & {result.nameGroom}</Typography>
                    <Typography variant="body2">Registration Date: {result.registrationDate}</Typography>
                    <Typography variant="body2">SR No.: {result.srNo}</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="small" onClick={() => handleViewDetails(result)}>
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </StyledPaper>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
}
