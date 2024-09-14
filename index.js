const express = require('express');
const app = express();
const prisma = require('./db/prisma');

app.use(express.json());

app.post('/create', async(req,res)=>{
  const {name,email,password} = req.body;
  try{
    const createSampleData = await prisma.sample.create({
      data: {
        name: name,
        email: email,
        password:password
      }
   });
   return res.status(200).json(createSampleData);
  } catch(err) {
    console.log(err);
  }
});

  app.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    try {
     const deleteSampleData = await prisma.sample.delete({
      where : {id : parseInt(id)}
     });
     return res.status(200).json({'msg' : 'Data deleted successfully'});
    }catch (err) {
       console.log(err);
    }
  });

  app.get('/', async(req,res)=>{
    try {
      const samples = await prisma.sample.findMany();
      return res.status(200).json(samples);
    }catch (err) {
      console.log(err);
    }
  });

  app.patch('/update/:id', async (req,res)=>{
    const {id} = req.params;
    const {name,email,password} = req.body;
    try {
     const updateSample = await prisma.sample.update({
      where:{id : parseInt(id)},
      data : {name,email,password}
     });
     return res.status(200).json(updateSample);
    }catch(err) {
      console.log(err);
    }
  });
    
 

 
app.listen(8118, (req,res)=>{
  console.log('server listening');
});

