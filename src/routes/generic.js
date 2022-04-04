import express from 'express';
import { getAllEntries, getEntries, updateEntries, createEntry, deleteEntry } from '../controllers/generic.js';

const router = express.Router();

router.get('/:model', getAllEntries);
router.get('/:model/:field/:value', getEntries);
router.put('/:model/:field/:value', updateEntries);
router.post('/:model', createEntry);
router.delete('/:model/:field/:value', deleteEntry);

export default router;