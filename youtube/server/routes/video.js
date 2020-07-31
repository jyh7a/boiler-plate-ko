const express = require('express');
const router = express.Router();
// const { Video } = require("../models/User");

const { auth } = require("../middleware/auth");
const multer = require("multer")
const ffmpeg = require("fluent-ffmpeg")

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: function  (req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.mp4') {
        return cb(null, new Error('Only mp4 is allowed'))
    }
    cb(null, true)
  }
})

const upload = multer({
  storage: storage
}).single('file')

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // 비디오를 서버에 저장한다
  upload(req, res, err => {
    if(err) return res.json({success: false, err})
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename})
  })
})


router.post('/thumbnail', (req, res) => {
  // 썸네일 생성 하고 비디오 러닝타임도 가져오기

  let fileDuration = ""
  let filePath = ""

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    console.dir(metadata) // all metadata
    console.log(metadata.format.duration)
    fileDuration = metadata.format.duration
  })

  // 썸네일 생성
  ffmpeg(req.body.url)
  .on('filenames', (filenames) => {
    console.log('Will generate ' + filenames.join(', '))
    console.log(filenames)

    filePath = 'uploads/thumbnails/' + filenames[0]
  })
  .on('end', () => {
    console.log('Scrennshots taken')
    return res.json({success:true, url:filePath, fileDuration:fileDuration})
  })
  .on('error', (err) => {
    console.error(err)
    return res.json({success:false, err})
  })
  .screenshots({
    // Will take screenshots at 20%, 40%, 60% and 80% of the video
    count: 3,
    folder: 'uploads/thumbnails',
    size: '320x240',
    // '%b': input basename (filename w/o extension)
    filename: 'thumbnail-%b.png'
  })
})


module.exports = router