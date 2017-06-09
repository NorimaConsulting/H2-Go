/**
 * GET /
 * Home page.
 */

const express = require('express')
const router = express.Router()
const passportConfig = require('../config/passport');
const meterController = require('../controllers/meterController');


router.post('/SubmitReading/:readingID', (req, res) => {

  var readingID = req.params.readingID;
  readingID = readingID.trim();
  console.log(readingID)

  meterController.getAReadingByID(readingID, (err,reading)=>{
    if(reading){
      meterNumberArr = getArrayOfDigits(reading.meter.meterNumber);
      readingStringArr = getArrayOfDigits(reading.readingString);

      res.setHeader("Content-Type", "application/xml");
      res.render('submitReadingxml', {
        reading,
        meterNumberArr,
        readingStringArr

      });
    }
    else{
      res.status(404).send("Reading Not Found")
    }
  })

});

router.post('/ReadingHasBeenSubmited/:readingID', (req, res) => {
  var readingID = req.params.readingID;
  readingID = readingID.trim();


  console.log("============Confirm Recived===========");
  console.log(req.body)
  console.log(readingID)
  console.log("============END===========");


  if(req.body.RecordingStatus =="completed"){
    console.log(req.body.RecodingUrl)
    emailController.addReadingConfirmation(readingID,
      req.body.RecordingUrl,
      audioTranscript,
      (err)=>{
        if(err){
          res.status(500).send(err)
        }else{
          res.send({success:true})
        }
      })
  }

});


function getArrayOfDigits(str) {
  var output = str.split('');
  for (var i = 0; i < output.length; i++) {
    output[i] = parseInt(output[i]);
  }
  return output;
}

module.exports = router;
