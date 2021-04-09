import express from 'express';
import multer from 'multer';
import mime from 'mime-types';

const uploadRouter = express.Router();

const profile_pic = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/profile_pics/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const document_config = multer.diskStorage({
  destination(req, files, cb) {
    cb(null, 'uploads/documents/');
  },
  filename(req, file, cb) {
    let ext = mime.extension(file.mimetype);
    cb(null, `${Date.now()}.${ext}`);
  },
});

const message_config = multer.diskStorage({
  destination(req, files, cb) {
    cb(null, 'uploads/messages/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: profile_pic });
const document_upload = multer({ storage: document_config });
const message_upload = multer({ storage: message_config });

uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

uploadRouter.post(
  '/documents',
  document_upload.array('files[]', 12),
  (req, res) => {
    if (req.files) {
      const files = req.files.map((value) => {
        return {
          name: value.originalname,
          path: '/' + value.path,
          file_name: value.filename,
        };
      });
      res.send(files);
    }
  }
);

uploadRouter.post('/document', document_upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      name: req.file.originalname,
      path: '/' + req.file.path,
      file_name: req.file.filename,
    });
  }
});
uploadRouter.post(
  '/message',
  message_upload.single('message_image'),
  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);

export default uploadRouter;
