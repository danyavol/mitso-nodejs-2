import express, { Request, Response, Router } from 'express';
import { handleError } from '../../services/handle-error.service';
import authService from './auth.service';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        await authService.authorizeUser(res, login, password);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

export default router;