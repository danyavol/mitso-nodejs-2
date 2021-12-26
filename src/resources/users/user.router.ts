import express, { Request, Response, Router } from 'express';
import { handleError } from '../../services/handle-error.service';
import userService from './user.service';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        await userService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

export default router;