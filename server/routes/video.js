const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { noSpace } =require("../utils/trim")
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");


const path = require("path");
let fileName = '';

//Storage Multer Config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        fileName = noSpace(file.originalname)
        cb(null, `${Date.now()}_${fileName}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(fileName);
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage: storage}).single("file");


// ===============================
//              Video
// ===============================

router.post('/uploads', (req, res) => {
    // 클라이언트에서 받은 비디오를 서버에 저장
    upload(req, res, err =>{
        if(err) {
            return res.json({ success:false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/uploadVideo', (req, res) => {
    // 인스턴스화 후 정보 저장
    const video = new Video(req.body)
    
    // 비디오 정보 DB에 저장
    video.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true})
    })

})

router.get('/getVideos', (req, res) => {
    // DB에서 비디오를 가져와 클라이언트에 보낸다.
    //video collection 모든 documents 가져옴.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})

router.post('/thumbnails', (req, res) => {
    // 썸네일 생성하고 비디오 러닝타임 가져오기
    let filePath =""
    let fileDuration =""

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        fileDuration = metadata.format.duration
    });

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            filePath = "thumbnails/" + filenames[0]
        })
        .on('end', function (){
            return res.json({success: true, url: filePath, duration: fileDuration})
        })
        .on('error', function (err) {
            return res.json({success: false, err})
        })
        .screenshots({
            count: 1,
            folder: 'thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
})

module.exports= router;