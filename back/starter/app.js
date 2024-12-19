import express from 'express'
import morgan from 'morgan';
import bootstrap from './src/app.controller.js';
const app=express();



bootstrap(express , app , morgan)

export default app;