import { Router } from 'express';
import  multer  from "multer";
import { uploadController } from '../controllers/uploadController';

const ROOT_PATH = "/home/app/v1/ng-node-rest-mysql/server/"
const URL_PATH = "https://app.avellanedacompras.com/"
const UP_REL_PATH = "public/"
const UPLOAD_PATH = ROOT_PATH+UP_REL_PATH;
class UploadRoutes {

    public router: Router = Router();

    
    constructor() {
        this.config();
    }
    
    config(): void {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, UPLOAD_PATH)
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname + '-' + uniqueSuffix)
            }
          })
        var fileFilter = (req: any,file: any,cb: any) => {
            if(file.mimetype === "image/jpg"  || 
               file.mimetype ==="image/jpeg"  || 
               file.mimetype ===  "image/png"){
             
            cb(null, true);
           }else{
              cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
        }
        }
        var upload = multer({storage: storage, fileFilter : fileFilter});
        this.router.post('/', upload.single('file'), this.upHandling);
    }

    private upHandling(req, res){
        console.log(req.file.filename);
        var iurl = URL_PATH + UP_REL_PATH+ req.file.filename;
        console.log(iurl)
        res.json({filename: iurl});
    }

}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;
