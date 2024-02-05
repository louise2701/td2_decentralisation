const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZTgwODkwZi03OTM5LTRiZWItOGIxOS1mZWM2YzdjM2U4YjgiLCJlbWFpbCI6ImxvdWlzZS5mZXJyZWlyYUBlZHUuZGV2aW5jaS5mciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyMDdhMzlkNmRlMGRjNWRhOWYwYSIsInNjb3BlZEtleVNlY3JldCI6ImQzMWI1ODc5OTJkZjg5MGUxYmZiYWQwZmU2YTUyYjhkOTIyNWRmMjZkOGYzOTczZDVmNDgxZmMzZTQ2OGM3MTgiLCJpYXQiOjE3MDcxNDY3MDF9.sRfgB6nnOBBCTwgmMXeVkwAqsOZ4MPqb6gdF7AZ9pUw'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "C:\\Users\\louis\\Downloads\\IPFS-command.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS()